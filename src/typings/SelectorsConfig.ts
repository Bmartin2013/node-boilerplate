import { Selector } from "./Selector";

export class SelectorsConfig {
  pageUrl: string;
  communityIconSelector: Selector;
  communitySelectors: Selector[];
  searchMemberSelector: Selector;
  community: string;

  constructor(
    pageUrl: string,
    communityIconSelector: Selector,
    communitySelectors: Selector[],
    searchMemberSelector: Selector,
    community: string
  ) {
    this.pageUrl = pageUrl;
    this.communityIconSelector = communityIconSelector;
    this.communitySelectors = communitySelectors;
    this.searchMemberSelector = searchMemberSelector;
    this.community = community;
  }
}
