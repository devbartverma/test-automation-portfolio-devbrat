package com.automation.factory;

import com.microsoft.playwright.*;

public class PlaywrightFactory {
    private static Playwright playwright;
    private static Browser browser;
    private static BrowserContext context;
    private static Page page;

    public static Page createPage() {
        if (playwright == null) {
            playwright = Playwright.create();
        }
        if (browser == null) {
            browser = playwright.chromium().launch(new BrowserType.LaunchOptions().setHeadless(false));
        }
        if (context == null) {
            context = browser.newContext();
        }
        if (page == null) {
            page = context.newPage();
            page.setDefaultTimeout(30000);
        }
        return page;
    }

    public static void closePage() {
        if (page != null) {
            page.close();
            page = null;
        }
    }

    public static void closeContext() {
        if (context != null) {
            context.close();
            context = null;
        }
    }

    public static void closeBrowser() {
        if (browser != null) {
            browser.close();
            browser = null;
        }
    }

    public static void closePlaywright() {
        if (playwright != null) {
            playwright.close();
            playwright = null;
        }
    }

    public static void closeAll() {
        closePage();
        closeContext();
        closeBrowser();
        closePlaywright();
    }
}
