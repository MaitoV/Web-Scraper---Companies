"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const initScraping = (homeUrl, paginationTotal) => __awaiter(void 0, void 0, void 0, function* () {
    let pagesScraped = 1;
    const homeUrlwithPagination = `${homeUrl}${pagesScraped}`;
    // Abrir un browser de chronium
    const browser = yield puppeteer_1.default.launch({ headless: false });
    // Abrirmos una nueva tab dentro de nuestro browser
    const tab = yield browser.newPage();
    // En la nueva tab ingresamos al home de la pagina a scrapear en su numero de paginacion
    while (pagesScraped < paginationTotal) {
        yield tab.goto(homeUrlwithPagination);
        yield tab.waitFor(2000);
        /*const getLinks = await tab.evaluate(() => {
            const elements: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('h2 .resultLink');
            const linksFromThisPage: Array<string> = [];

            for(let i = 0; i < elements.length; i++) {
                linksFromThisPage.push(elements[i].href)
            }
            return linksFromThisPage;
        })
        console.log(getLinks);*/
        pagesScraped++;
        console.log(pagesScraped);
    }
    yield browser.close();
});
exports.default = initScraping;
