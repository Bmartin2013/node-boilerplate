import { Selector } from "../typings/Selector";
import { SelectorsConfig } from "../typings/SelectorsConfig";
import {
    COMMUNITY,
    COMMUNITY_1,
    COMMUNITY_2,
    COMMUNITY_3,
    COMMUNITY_4,
    COMMUNITY_5,
    COMMUNITY_ICON_ID,
    DRIVER_URL,
    SEARCH_MEMBER_ID,
} from "./dotenv";

const COMMUNITY_ICON_SELECTOR = new Selector(COMMUNITY_ICON_ID, 2000);

const COMMUNITY_SELECTORS: Selector[] = [
    new Selector(COMMUNITY_1, 1000),
    new Selector(COMMUNITY_2, 1000),
    new Selector(COMMUNITY_3, 1000),
    new Selector(COMMUNITY_4, 1000),
    new Selector(COMMUNITY_5, 1000),
];

const SEARCH_MEMBER_SELECTOR: Selector = new Selector(
    SEARCH_MEMBER_ID,
    500
);

export const OLD_DEFAULT_CONFIG = new SelectorsConfig(
    DRIVER_URL,
    COMMUNITY_ICON_SELECTOR,
    COMMUNITY_SELECTORS,
    SEARCH_MEMBER_SELECTOR,
    COMMUNITY
);


export const DEFAULT_CONFIG = new SelectorsConfig(
    "https://web.whatsapp.com/",
    new Selector("aria-label=\"Comunidades\"", 2000),
    [
        new Selector("aria-label=\"Comunidad: Test\"", 1000),
        new Selector("aria-label=\"Menú de navegación\"", 1000),
        new Selector("aria-label=\"Ver miembros\"", 1000),
        new Selector("aria-label=\"Añadir miembros\"", 1000),
        new Selector("#page-4", 1000),
    ],
    new Selector("aria-label=\"Busca un nombre o número\"", 500),
    "https://web.whatsapp.com/"
);