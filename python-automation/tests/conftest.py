import pytest
from playwright.sync_api import Page
from src.automation.factory.playwright_factory import PlaywrightFactory


@pytest.fixture(scope="function")
def page(request) -> Page:
    """
    Fixture that provides a Playwright page instance.
    Headless and slow_mo can be controlled via command-line options.
    """
    headless = not request.config.getoption("--headed", default=True)
    slow_mo = request.config.getoption("--slowmo", default=0)

    page_instance = PlaywrightFactory.create_page(headless=headless, slow_mo=slow_mo)
    yield page_instance
    PlaywrightFactory.close_all()


def pytest_addoption(parser):
    """Add custom command-line options for pytest."""
    parser.addoption(
        "--headed",
        action="store_true",
        default=False,
        help="Run tests in headed mode (see browser)"
    )
    parser.addoption(
        "--slowmo",
        action="store",
        type=int,
        default=0,
        help="Slow down execution by the specified number of milliseconds"
    )
