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
require("dotenv/config");
const dbConnection_1 = __importDefault(require("./database/dbConnection"));
const initScraping_1 = __importDefault(require("./tools/initScraping"));
//Home url sin el numero de paginacion pero con el params de la paginacion para que lo pueda generar solo
const webHomeUrl = process.env.WEBSITE_HOME;
//Paginas totales disponibles para scrapear
const totalPagesToScrap = Number(process.env.PAGINATION_TOTAL);
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, dbConnection_1.default)();
    yield (0, initScraping_1.default)(webHomeUrl, totalPagesToScrap);
});
init();
