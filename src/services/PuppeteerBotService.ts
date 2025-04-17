import puppeteer, { Page } from "puppeteer";
import { escribirLog } from "../utils/logger";
import { IBotService } from "../interfaces/IBotService";
import { wait, clickWithWait, typeMember, typeWithEnter } from "../utils/puppeteerUtils";
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
    if (!this.page) throw new Error("Page not initialized.");
    escribirLog(`🔎 Searching community: ${this.selectorsConfig.community}`);

    // start the process of adding members
    await wait(2000);
    await this.searchCommunity(this.selectorsConfig.communitySelectors);

    for (const member of members) {
      await typeMember(this.page, member, this.selectorsConfig.searchMemberSelector);
      await typeWithEnter(this.page, this.selectorsConfig.searchMemberSelector);
    }
  }

  private async searchCommunity(communitySelectors: Selector[]): Promise<void> {
    if (!this.page) throw new Error("Page not initialized.");

    // TODO: use selector class to avoid hardcoding
    await this.page.evaluate(() => {
      const icon = document.querySelector('[aria-label="community-icon"]');
      if (icon) (icon as HTMLElement).click();
    });

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
