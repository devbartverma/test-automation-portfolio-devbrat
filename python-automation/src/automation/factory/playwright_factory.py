from playwright.sync_api import sync_playwright, Browser, BrowserContext, Page
from typing import Optional


class PlaywrightFactory:
    _playwright = None
    _browser: Optional[Browser] = None
    _context: Optional[BrowserContext] = None
    _page: Optional[Page] = None

    @classmethod
    def create_page(cls, headless: bool = True, slow_mo: int = 0) -> Page:
        """Create and return a new Playwright page instance."""
        if cls._playwright is None:
            cls._playwright = sync_playwright().start()

        if cls._browser is None:
            cls._browser = cls._playwright.chromium.launch(
                headless=headless,
                args=['--disable-blink-features=AutomationControlled']
            )

        if cls._context is None:
            cls._context = cls._browser.new_context()

        if cls._page is None:
            cls._page = cls._context.new_page()
            cls._page.set_default_timeout(30000)
            if slow_mo > 0:
                cls._page.slow_mo = slow_mo

        return cls._page

    @classmethod
    def close_page(cls):
        """Close the current page."""
        if cls._page is not None:
            cls._page.close()
            cls._page = None

    @classmethod
    def close_context(cls):
        """Close the browser context."""
        if cls._context is not None:
            cls._context.close()
            cls._context = None

    @classmethod
    def close_browser(cls):
        """Close the browser instance."""
        if cls._browser is not None:
            cls._browser.close()
            cls._browser = None

    @classmethod
    def close_playwright(cls):
        """Close Playwright instance."""
        if cls._playwright is not None:
            cls._playwright.stop()
            cls._playwright = None

    @classmethod
    def close_all(cls):
        """Close all Playwright resources."""
        cls.close_page()
        cls.close_context()
        cls.close_browser()
        cls.close_playwright()
