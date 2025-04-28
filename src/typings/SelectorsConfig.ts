import { Selector } from "./Selector";

export class SelectorsConfig {
  pageUrl: string;
  communityIconSelector: Selector;
  communitySelectors: Selector[];
  searchMemberSelector: Selector;
  community: string;
  checkboxSelector: Selector;
  submitSelector: Selector;
  confirmSubmitSelector: Selector;
  inviteGroupSelector: Selector;
  nextSelector: Selector;

  constructor(
    pageUrl: string,
    communityIconSelector: Selector,
    communitySelectors: Selector[],
    searchMemberSelector: Selector,
    checkboxSelector: Selector,
    submitSelector: Selector,
    confirmSubmitSelector: Selector,
    inviteGroupSelector: Selector,
    nextSelector: Selector,
    community: string
  ) {
    this.pageUrl = pageUrl;
    this.communityIconSelector = communityIconSelector;
    this.communitySelectors = communitySelectors;
    this.searchMemberSelector = searchMemberSelector;
    this.community = community;
    this.checkboxSelector = checkboxSelector
    this.submitSelector = submitSelector
    this.confirmSubmitSelector = confirmSubmitSelector
    this.inviteGroupSelector = inviteGroupSelector
    this.nextSelector = nextSelector
  }
}
