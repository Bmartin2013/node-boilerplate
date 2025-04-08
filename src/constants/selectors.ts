import { Selector } from "../typings/Selector";

export const COMMUNITY_SELECTORS: Selector[] = [
  new Selector("#community-1", 1000),
  new Selector("#community-options", 1000),
  new Selector("#view-members", 1000),
  new Selector("#member-add", 1000),
  new Selector("#page-4", 1000),
];

export const SEARCH_MEMBER_SELECTOR: Selector = new Selector("#search-member", 500);