import dotenv from "dotenv";
dotenv.config();

export const COMMUNITY = process.env.COMMUNITY || "Test";
export const LOG_FILE = "log_usuarios.txt";
export const DRIVER_URL = process.env.DRIVER_URL || "http://localhost:4444/wd/hub";
export const COMMUNITY_ICON_ID= process.env.COMMUNITY_ICON_ID || "#community-icon";
export const SEARCH_MEMBER_ID = process.env.SEARCH_MEMBER_ID || "#search-member";
export const COMMUNITY_1 = process.env.COMMUNITY_1 || "#community-1";
export const COMMUNITY_2 = process.env.COMMUNITY_2 || "#community-options";
export const COMMUNITY_3 = process.env.COMMUNITY_3 || "#view-members";
export const COMMUNITY_4 = process.env.COMMUNITY_4 || "#member-add";
export const COMMUNITY_5 = process.env.COMMUNITY_5 || "#page-4";
