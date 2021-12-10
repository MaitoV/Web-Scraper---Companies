import 'dotenv/config';
import initDB from './database/dbConnection';
import initScraping from './tools/initScraping';

//Home url sin el numero de paginacion pero con el params de la paginacion para que lo pueda generar solo
const webHomeUrl = process.env.WEBSITE_HOME as string;
//Paginas totales disponibles para scrapear
const totalPagesToScrap = Number(process.env.PAGINATION_TOTAL);

const init = async () => {
    await initDB();
    await initScraping(webHomeUrl, totalPagesToScrap);
}

init();


