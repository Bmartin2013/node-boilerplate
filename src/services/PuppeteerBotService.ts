import puppeteer, { Browser, Page } from "puppeteer";
import { escribirLog } from "../utils/logger";
import { COMMUNITY } from "../config/dotenv";
import { IBotService } from "../interfaces/IBotService";
import {
  wait,
  clickWithWait,
  typeWithDelay,
} from "../utils/puppeteerUtils";
import { BrowserManager } from "../utils/BrowserManager";
import {
  COMMUNITY_SELECTORS,
  SEARCH_MEMBER_SELECTOR,
} from "../constants/selectors";
import ApiService from "./ApiServiceMock";
import { Selector } from "../typings/Selector";

export class PuppeteerBotService implements IBotService {
  private page: Page | null = null;
  private apiService: ApiService;

  constructor() {
    this.apiService = new ApiService();
  }

  private async init(): Promise<void> {
    const browserManager = new BrowserManager();
    const { page } = await browserManager.initBrowser();
    this.page = page;
  }

  private async addMembersToTheCommunity(members: string[]): Promise<void> {
    if (!this.page) throw new Error("Page not initialized.");
    escribirLog(`🔎 Searching community: ${COMMUNITY}`);

    // start the process of adding members
    await wait(2000);
    await this.searchCommunity(COMMUNITY_SELECTORS);

    for (const member of members) {
      await this.typeMember(member, SEARCH_MEMBER_SELECTOR);
      // add whitespace to simulate enter (TODO: add an enter as well)
      await this.page.type(SEARCH_MEMBER_SELECTOR.id, " ");
    }
  }

  private async searchCommunity(communitySelectors: Selector[]): Promise<void> {
    if (!this.page) throw new Error("Page not initialized.");

    // TODO: use selector class to avoid hardcoding
    await this.page.evaluate(() => {
      const icon = document.getElementById("community-icon");
      if (icon) (icon as HTMLElement).click();
    });

    for (const selector of communitySelectors) {
      await clickWithWait(this.page, selector);
    }
  }

  private async typeMember(member: string, search: Selector): Promise<void> {
    if (!this.page) throw new Error("Page not initialized.");
    await clickWithWait(this.page, search);

    try {
      await typeWithDelay(this.page, member, search);
    } catch (err) {
      escribirLog(`⚠️ Could not add user ${member}: ${err}`);
    }
  }

  async ejecutarBot(): Promise<void> {
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
