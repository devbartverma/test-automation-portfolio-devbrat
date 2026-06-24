# Test automation portfolio - Devbrat Verma

A centralized showcase of modern end-to-end (E2E) testing frameworks, demonstrating best practices in test automation, Page Object Model (POM) design patterns, and automated reporting.

## 🚀 Target Applications & Credentials

To ensure reliable, reproducible test runs, the frameworks in this repository target public, sandbox applications with the following test credentials:

1. **SauceDemo E-Commerce Platform**  
   * **URL:** [https://www.saucedemo.com/](https://www.saucedemo.com/)
   * **Credentials:** `standard_user` / `secret_sauce`
   * **Scenarios:** E2E shopping cart flows, login validation, sorting filters, and checkout verification.

2. **Practice Test Automation**  
   * **URL:** [https://practicetestautomation.com/practice-test-login/](https://practicetestautomation.com/practice-test-login/)
   * **Credentials:** `student` / `Password123`
   * **Scenarios:** Positive/negative authentication paths and secure area element visibility.

---

## 🛠️ Frameworks Included

### 1. Playwright (TypeScript)
*   **Location:** `/playwright`
*   **Design Pattern:** Page Object Model (POM)
*   **Key Capabilities:** Multi-browser parallel execution (Chromium, Firefox, WebKit), API request interception, auto-waiting mechanism validation, and visual regression snapshots.

### 2. Cypress (JavaScript)
*   **Location:** `/cypress`
*   **Design Pattern:** App Actions & Custom Commands
*   **Key Capabilities:** Real-time test runner execution, network mocking/stubbing for isolated UI flows, and custom command abstraction for repetitive login sequences.

---

## 🏗️ Project Structure

```
test-automation-portfolio/
│
├── cypress/               # Cypress implementation
│   ├── e2e/               # Test spec files
│   └── support/           # Custom commands and page objects
│
├── playwright/            # Playwright implementation
│   ├── tests/             # Test spec files
│   └── pages/             # Page Object classes
│
├── LICENSE                # MIT License
└── README.md              # Project documentation
```

---

## ⚡ Key QA Practices Demonstrated
*   **Flaky Test Mitigation:** Exclusively utilizing resilient locator strategies, prioritizing `data-test` attributes over brittle CSS paths or XPaths.
*   **Data-Driven Testing:** Separating test environments from data payloads by integrating JSON fixtures for dynamic login parameters.
*   **Comprehensive Reporting:** Integrated failure hooks that capture detailed HTML reports, context screenshots, and video assets upon failure.

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
