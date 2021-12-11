import puppeteer from 'puppeteer';
import { ProfileDataI, ProfileDataExtendI } from '../commons/profileDataInterface';
import companiesProfileModel from '../database/models/companiesProfile';


const initScraping = async (homeUrl: string, paginationTotal:number) => {
    try {
        let pagesScraped: number = 1;

        // Abrir un browser de chronium
        const browser: puppeteer.Browser = await puppeteer.launch({ headless: false });
        // Abrirmos una nueva tab dentro de nuestro browser
        const tab: puppeteer.Page = await browser.newPage();
    
        // En la nueva tab ingresamos al home de la pagina a scrapear en su numero de paginacion
        while(pagesScraped < paginationTotal) {
            //Url de la home con paginacion
            let homeUrlwithPagination = homeUrl + pagesScraped;
            
            await tab.goto(homeUrlwithPagination);
            await tab.waitFor(2000);
    
            //Capturamos todos los links de esa pagina
            const getLinks = await tab.evaluate(() => {
                const elements: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('h2 .resultLink');
                const linksFromThisPage: Array<string> = [];
    
                for(let i = 0; i < elements.length; i++) {
                    linksFromThisPage.push(elements[i].href)
                }
                return linksFromThisPage;
            })
    
            const scraped = await scrapePageByPage(getLinks, tab);
        
            pagesScraped += 1;
        }
        
        await browser.close();
    } catch (error) {
        console.log(error);
    }
}

async function scrapePageByPage (urls: Array<string>, tab: puppeteer.Page) {
    try {
        const companiesData = [];

        for(let link of urls) {
            //Ingresamos a cada pagina-detalle de empresa
            await tab.goto(link);
            await tab.waitForSelector('.footer-content');
        
            const companyData = await tab.evaluate(() => {
                    const profileData: Partial<ProfileDataExtendI> = {};

                    const fieldsNames: NodeListOf<HTMLElement> = document.querySelectorAll('.profile-info-name');
                    const fieldsValues: NodeListOf<HTMLElement> = document.querySelectorAll('.profile-info-value');
                    const buyerTab = document.querySelector('#tab_id_Compra');
                    const sellerTab = document.querySelector('#tab_id_Venta');

                    profileData['nombre'] = document.querySelector('h1')?.innerText;
                    for(let i = 0; i < fieldsNames.length; i++) {
                        const propertyName = fieldsNames[i].innerText?.replace(/ /g, "").toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,""); //Eliminamos espacios, convertimos todo a letras bajas y elimamos los acentos
                        const value = fieldsValues[i].innerText;

                        profileData[propertyName as keyof ProfileDataI] = value;
                    }
                    return  {companyProfile: profileData, buyerTabExists: buyerTab? true: false, sellerTabExists: sellerTab? true: false};
            })

            const {companyProfile, buyerTabExists, sellerTabExists} = companyData;
            console.log(companyProfile);
            if(buyerTabExists) {
                await tab.click('#tab_id_Compra');
                await tab.waitForSelector('.footer-content');
                const profileBuyer = await tab.evaluate(() => {
                    const buyerItems = [];
                    const buyerProfile: NodeListOf<HTMLElement> = document.querySelectorAll('.label-marca a');
                    for(let i = 0; i < buyerProfile.length; i++) {
                        buyerItems.push(buyerProfile[i].innerText);
                    }
                    return buyerItems;
                })
                companyProfile['perfilcomprador'] = profileBuyer;
            }
            if(sellerTabExists) {
                await tab.click('#tab_id_Venta');
                await tab.waitForSelector('.footer-content');
                const profileSeller = await tab.evaluate(() => {
                    const sellerItems = [];
                    const sellerProfile: NodeListOf<HTMLElement> = document.querySelectorAll('.label-marca a');
                    for(let i = 0; i < sellerProfile.length; i++) {
                        sellerItems.push(sellerProfile[i].innerText);
                    }
                    return sellerItems;
                })
                companyProfile['perfilvendedor'] = profileSeller;
            }
            companiesData.push(companyProfile);
        }

        await companiesProfileModel.insertMany(companiesData);

    } catch (error) {
        throw error;
    }
} 


export default initScraping;