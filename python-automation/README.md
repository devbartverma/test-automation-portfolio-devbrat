# Python Playwright Test Automation Framework

Enterprise-grade test automation framework using Playwright Python with BDD-style pytest tests.

## Project Structure

```
python-automation/
├── src/
│   └── automation/
│       ├── data/
│       │   ├── __init__.py
│       │   ├── test_data.py              # Test data constants
│       │   └── product_data.py           # Product and sort options
│       ├── pages/
│       │   ├── __init__.py
│       │   ├── login_page.py
│       │   ├── inventory_page.py
│       │   ├── cart_page.py
│       │   ├── checkout_page.py
│       │   └── product_detail_page.py
│       ├── factory/
│       │   ├── __init__.py
│       │   └── playwright_factory.py     # Browser instance management
│       └── base/
│           └── __init__.py
├── tests/
│   ├── __init__.py
│   ├── conftest.py                       # Pytest configuration and fixtures
│   ├── test_auth.py                      # BDD-style authentication tests
│   ├── test_inventory.py                 # BDD-style inventory tests
│   └── test_checkout.py                  # BDD-style checkout tests
├── requirements.txt                       # Python dependencies
├── pytest.ini                             # Pytest configuration
├── .env.example                           # Environment variables example
└── README.md                              # This file
```

## Technology Stack

- **Python 3.8+** - Programming language
- **Playwright Python** - Browser automation framework
- **pytest** - Testing framework with BDD plugins
- **python-dotenv** - Environment variable management

## Prerequisites

- Python 3.8 or higher
- pip (Python package manager)
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/devbartverma/test-automation-portfolio-devbrat.git
cd python-automation
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Download Playwright browsers (one-time setup):
```bash
playwright install
```

## Running Tests

### Run all tests:
```bash
pytest
```

### Run with verbose output:
```bash
pytest -v
```

### Run specific test file:
```bash
pytest tests/test_auth.py
```

### Run specific test:
```bash
pytest tests/test_auth.py::TestAuthentication::test_standard_user_can_login
```

### Run with HTML report:
```bash
pytest --html=report.html --self-contained-html
```

### Run in headed mode (see browser):
```bash
pytest --headed
```

## Test Cases

### Authentication Tests (test_auth.py)
- ✅ Standard user can login
- ✅ Locked out user shows error
- ✅ Invalid credentials show error

### Inventory Tests (test_inventory.py)
- ✅ Shows six products
- ✅ Can add product to cart

### Checkout Tests (test_checkout.py)
- ✅ Checkout with one item completes successfully
- ✅ Checkout validation shows first name error

## Page Objects

### LoginPage
Handles login functionality and authentication flows.

### InventoryPage
Manages product listing, sorting, and cart operations.

### CartPage
Handles shopping cart operations and checkout navigation.

### CheckoutPage
Manages checkout process including customer info and order completion.

### ProductDetailPage
Handles product detail page interactions and assertions.

## Test Data

Test data is centralized in the `data` package:

- **test_data.py** - Users, URLs, error messages, and customer data
- **product_data.py** - Product names, add-to-cart IDs, and sort options

## BDD Style

Tests are written using descriptive test names and docstrings following Given-When-Then structure:

```python
def test_standard_user_can_login(self, page):
    """
    Given: I navigate to login page
    When: I login with valid credentials
    Then: I should be logged in successfully
    """
    # Given - page is already at login
    login_page = LoginPage(page)
    login_page.go_to()
    
    # When
    login_page.login(Users.STANDARD_USERNAME, Users.STANDARD_PASSWORD)
    
    # Then
    login_page.assert_logged_in()
```

## Best Practices Implemented

✅ **Page Object Model** - Clear separation of test logic and page interactions
✅ **Test Data Management** - Centralized test data and constants
✅ **Factory Pattern** - Browser instance management with PlaywrightFactory
✅ **BDD Style** - Descriptive test names and Given-When-Then structure
✅ **pytest Fixtures** - Reusable fixtures for setup and teardown
✅ **Assertions** - Clear and descriptive assertions
✅ **Conftest** - Centralized pytest configuration and fixtures
✅ **Virtual Environment** - Isolated Python environment

## Debugging

To run tests in headed mode (see browser):

```bash
pytest --headed
```

For debugging with pdb:
```bash
pytest --pdb
```

For slow motion:
```bash
pytest --slowmo 1000
```

## Environment Variables

Create a `.env` file based on `.env.example`:

```env
HEADLESS=False
SLOWMO=0
TIMEOUT=30000
```

## Continuous Integration

The framework is ready for CI/CD integration. Run tests in headless mode:

```bash
pytest --headed=False
```

## Contributing

1. Create a new branch for your feature
2. Write tests using descriptive names
3. Follow the page object model pattern
4. Run all tests before submitting a pull request

## License

MIT License - See LICENSE file for details
