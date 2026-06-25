# Java Playwright Test Automation Framework

Enterprise-grade test automation framework using Playwright Java with BDD-style Groovy tests.

## Project Structure

```
java-automation/
├── src/
│   ├── main/
│   │   └── java/com/automation/
│   │       ├── data/                    # Test data and fixtures
│   │       │   ├── TestData.java       # Test data constants
│   │       │   └── ProductData.java    # Product and sort options
│   │       ├── pages/                   # Page Object Models
│   │       │   ├── LoginPage.java
│   │       │   ├── InventoryPage.java
│   │       │   ├── CartPage.java
│   │       │   ├── CheckoutPage.java
│   │       │   └── ProductDetailPage.java
│   │       └── factory/
│   │           └── PlaywrightFactory.java  # Browser instance management
│   └── test/
│       ├── java/com/automation/
│       │   └── base/
│       │       └── BaseTest.java        # JUnit 5 base test class
│       └── groovy/com/automation/
│           └── tests/                   # BDD-style test specs
│               ├── AuthTests.groovy
│               ├── InventoryTests.groovy
│               └── CheckoutTests.groovy
├── pom.xml                              # Maven configuration
└── README.md                            # This file
```

## Technology Stack

- **Java 11+** - Programming language
- **Playwright** - Browser automation framework
- **Groovy** - BDD-style test writing
- **JUnit 5 (Jupiter)** - Test framework
- **Maven** - Build and dependency management
- **Logback** - Logging framework

## Prerequisites

- Java 11 or higher
- Maven 3.6+
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/devbartverma/test-automation-portfolio-devbrat.git
cd java-automation
```

2. Install dependencies:
```bash
mvn clean install
```

3. Download Playwright browsers (one-time setup):
```bash
mvn exec:java -Dexec.mainClass=com.microsoft.playwright.CLI -Dexec.args="install"
```

## Running Tests

### Run all tests:
```bash
mvn test
```

### Run specific test class:
```bash
mvn test -Dtest=AuthTests
```

### Run with specific pattern:
```bash
mvn test -Dtest=*Tests
```

## Test Cases

### Authentication Tests (AuthTests.groovy)
- ✅ Standard user can login
- ✅ Locked out user shows error
- ✅ Invalid credentials show error

### Inventory Tests (InventoryTests.groovy)
- ✅ Shows six products
- ✅ Can add product to cart

### Checkout Tests (CheckoutTests.groovy)
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

- **TestData.java** - Users, URLs, error messages, and customer data
- **ProductData.java** - Product names, add-to-cart IDs, and sort options

## BDD Style

Tests are written in Groovy using BDD (Behavior-Driven Development) style with Given-When-Then structure:

```groovy
@Test
@DisplayName("Given I navigate to login page When I login with valid credentials Then I should be logged in successfully")
void "standard user can login"() {
    // Given - page is already at login
    // When
    loginPage.login(TestData.Users.STANDARD_USERNAME, TestData.Users.STANDARD_PASSWORD)
    // Then
    loginPage.assertLoggedIn()
}
```

## Best Practices Implemented

✅ **Page Object Model** - Clear separation of test logic and page interactions  
✅ **Test Data Management** - Centralized test data and constants  
✅ **Factory Pattern** - Browser instance management with PlaywrightFactory  
✅ **BDD Style** - Human-readable test descriptions using Given-When-Then  
✅ **JUnit 5** - Modern Java testing framework with annotations and lifecycle hooks  
✅ **Assertions** - Clear and descriptive assertions  
✅ **Base Test Class** - Reusable setup and teardown logic  

## Debugging

To run tests in headed mode (see browser), modify `PlaywrightFactory.java`:

```java
browser = playwright.chromium().launch(new BrowserType.LaunchOptions().setHeadless(false));
```

For slow motion and debugging:
```java
browser = playwright.chromium().launch(new BrowserType.LaunchOptions()
    .setHeadless(false)
    .setSlowMo(1000));
```

## Continuous Integration

The framework is ready for CI/CD integration. Run tests in headless mode in CI pipelines:

```bash
mvn test -DargLine=--headless
```

## Contributing

1. Create a new branch for your feature
2. Write tests using the BDD style
3. Follow the page object model pattern
4. Run all tests before submitting a pull request

## License

MIT License - See LICENSE file for details
