import { Selector } from "../typings/Selector";
import { SelectorsConfig } from "../typings/SelectorsConfig";
import {
    COMMUNITY,
    COMMUNITY_1,
    COMMUNITY_2,
    COMMUNITY_3,
    COMMUNITY_4,
    COMMUNITY_ICON_ID,
    DRIVER_URL,
    SEARCH_MEMBER_ID,
} from "./dotenv";

const ARIA_LABEL = "aria-label";
const CLASS = "class";

const COMMUNITY_ICON_SELECTOR = new Selector(COMMUNITY_ICON_ID,ARIA_LABEL, 2000);

const COMMUNITY_SELECTORS: Selector[] = [
    new Selector(COMMUNITY_1,ARIA_LABEL, 1000),
    new Selector(COMMUNITY_2, ARIA_LABEL,1000),
    new Selector(COMMUNITY_3,ARIA_LABEL, 1000),
    new Selector(COMMUNITY_4,ARIA_LABEL, 1000),
];

const SEARCH_MEMBER_SELECTOR: Selector = new Selector(
    SEARCH_MEMBER_ID,
    ARIA_LABEL,
    500
);

export const OLD_DEFAULT_CONFIG = new SelectorsConfig(
    DRIVER_URL,
    COMMUNITY_ICON_SELECTOR,
    COMMUNITY_SELECTORS,
    SEARCH_MEMBER_SELECTOR,
    new Selector("x1n2onr6 xh8yej3", CLASS, 500),
    new Selector("Confirmar", ARIA_LABEL, 500),
    new Selector("x889kno x1a8lsjc xbbxn1n xxbr6pl x1n2onr6 x1rg5ohu xk50ysn x1f6kntn xyesn5m x1z11no5 xjy5m1g x1mnwbp6 x4pb5v6 x178xt8z xm81vs4 xso031l xy80clv x13fuv20 xu3j5b3 x1q0q8m5 x26u7qi x1v8p93f xogb00i x16stqrj x1ftr3km x1hl8ikr xfagghw x9dyr19 x9lcvmn xbtce8p xcjl5na x14v0smp x1k3x3db xgm1il4 xuxw1ft xv52azi", CLASS, 500),
    new Selector("x889kno x1a8lsjc xbbxn1n xxbr6pl x1n2onr6 x1rg5ohu xk50ysn x1f6kntn xyesn5m x1z11no5 xjy5m1g x1mnwbp6 x4pb5v6 x178xt8z xm81vs4 xso031l xy80clv x13fuv20 xu3j5b3 x1q0q8m5 x26u7qi x1v8p93f xogb00i x16stqrj x1ftr3km x1hl8ikr xfagghw x9dyr19 x9lcvmn xbtce8p xcjl5na x14v0smp x1k3x3db xgm1il4 xuxw1ft xv52azi", CLASS, 500),
    new Selector("Siguiente", ARIA_LABEL, 500),
    COMMUNITY
);