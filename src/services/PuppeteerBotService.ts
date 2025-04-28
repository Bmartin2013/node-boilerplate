import puppeteer, { Page } from "puppeteer";
import { escribirLog } from "../utils/logger";
import { IBotService } from "../interfaces/IBotService";
import {
  wait,
  clickWithWait,
  typeMember,
  typeWithEnter,
  selectAndClick,
  clickIfExists,
} from "../utils/puppeteerUtils";
import { BrowserManager } from "../utils/BrowserManager";
import ApiService from "./ApiServiceMock";
import { Selector } from "../typings/Selector";
import { SelectorsConfig } from "../typings/SelectorsConfig";

export class PuppeteerBotService implements IBotService {
  private page: Page | null = null;
  private apiService: ApiService;
  private selectorsConfig: SelectorsConfig;

  constructor(apiService: ApiService, selectorsConfig: SelectorsConfig) {
    this.apiService = apiService;
    this.selectorsConfig = selectorsConfig;
  }

  private async init(): Promise<void> {
    const browserManager = new BrowserManager();
    const { page } = await browserManager.initBrowser(
      this.selectorsConfig.pageUrl,
      this.selectorsConfig.communityIconSelector
    );
    this.page = page;
  }

  private async addMembersToTheCommunity(members: string[]): Promise<void> {
    const generalWait = 2000;
    if (!this.page) throw new Error("Page not initialized.");
    // start the process of adding members
    escribirLog(`➕ add members to the community: ${this.selectorsConfig.community}`);
    await wait(generalWait);

    // click on the community icon
    await this.searchCommunity(this.selectorsConfig.communitySelectors);
    await wait(generalWait);

    // add members to the community
    await this.addMembers(members);
    await wait(generalWait);

    // select the checkbox and send the invite
    await this.selectCheckboxAndSendInvite();
    await wait(generalWait);

  }

  private async selectCheckboxAndSendInvite(): Promise<void> {
    if (!this.page) throw new Error("Page not initialized.");
    escribirLog(`✅ Adding members...`);
    await selectAndClick(this.page, this.selectorsConfig.checkboxSelector);
    await clickIfExists(this.page, this.selectorsConfig.submitSelector);
    await wait(2000);
    await clickIfExists(this.page, this.selectorsConfig.confirmSubmitSelector);
    await wait(4000);
    escribirLog(`📩 Sending the invite...`);
    await clickIfExists(this.page, this.selectorsConfig.inviteGroupSelector);
    await wait(2000);
    await clickIfExists(this.page, this.selectorsConfig.nextSelector);
  }

  private async addMembers(members: string[]): Promise<void> {
    if (!this.page) throw new Error("Page not initialized.");
    escribirLog(`👧🏻👧🏻👧🏻 adding members ${members}`);
    for (const member of members) {
      escribirLog(`👧🏻 adding NEW member ${member}`);
      await wait(2000);
      await typeMember(
        this.page,
        member,
        this.selectorsConfig.searchMemberSelector
      );
      await typeWithEnter(this.page, this.selectorsConfig.searchMemberSelector);
    }
  }

  private async searchCommunity(communitySelectors: Selector[]): Promise<void> {
    if (!this.page) throw new Error("Page not initialized.");

    // click on the community icon
    escribirLog(`👯 Clicking on the community icon...`);
    await clickIfExists(this.page, this.selectorsConfig.communityIconSelector);

    escribirLog(`🔍 Go to the add members modal`);
    for (const selector of communitySelectors) {
      await clickWithWait(this.page, selector);
    }
  }

  async ejecutarBot(): Promise<void> {
    // find a way to use an object selector for comunity icon
    escribirLog("🔄 Initializing bot...");
    await this.init();

    const members = await this.apiService.getMembers();
    if (members.length === 0) {
      escribirLog("⚠️ No members approved.");
      return;
    }

    await this.addMembersToTheCommunity(members);
    escribirLog("🎉 Tada! all users were successfully added.");
  }
}
