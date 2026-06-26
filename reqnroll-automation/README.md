# Reqnroll (C#) BDD Test Automation Framework

UI + API automation built with **C#, .NET 8, Reqnroll (BDD), and Playwright**. Behaviour is
described in Gherkin `.feature` files and bound to reusable Page Objects via step definitions —
the same 15 UI + 3 API scenarios as the other suites in this portfolio, expressed in
Given/When/Then.

> Reqnroll is the open-source successor to SpecFlow — Gherkin-driven BDD for .NET.

## Project Structure

```
reqnroll-automation/
├── ReqnrollPlaywright.csproj
├── reqnroll.json                     # Reqnroll configuration
└── playwright/
    ├── Pages/                        # Page Object Models (Login, Inventory, Cart, Checkout, ProductDetail)
    ├── data/                         # TestData.cs, ProductData.cs
    ├── Features/                     # Gherkin specs
    │   ├── Authentication.feature
    │   ├── Inventory.feature
    │   ├── Cart.feature
    │   ├── Checkout.feature
    │   └── Api.feature
    ├── Steps/                        # Step definitions (Common/Auth/Inventory/Cart/Checkout/Api)
    └── Support/
        ├── PlaywrightDriver.cs       # Per-scenario Playwright lifecycle (context injection)
        └── Hooks.cs                  # @ui/@api setup, screenshot-on-failure, teardown
```

## Technology Stack

- **C# / .NET 8**, **Reqnroll.NUnit** (BDD on the NUnit runner)
- **Playwright for .NET** — UI driving and `IAPIRequestContext` for API tests
- **Page Object Model**, centralized test data, `data-test` locators

## Prerequisites

- .NET 8 SDK
- PowerShell (`pwsh`) for the one-time browser install

## Installation & Running

```bash
cd reqnroll-automation
dotnet build
pwsh bin/Debug/net8.0/playwright.ps1 install chromium   # one-time browser download

dotnet test                                  # all scenarios (headless)
HEADED=1 dotnet test                         # headed
dotnet test --filter "FullyQualifiedName~Checkout"   # a subset
```

## 🧪 Scenarios — 15 UI + 3 API

Target apps: **SauceDemo** (UI) and **JSONPlaceholder** (API). Same coverage as every other
suite in the portfolio, written as Gherkin.

### 🔐 Authentication — `Authentication.feature` (4)
| Scenario | Key assertions |
|----------|----------------|
| Standard user can log in | lands on inventory; title is **Products** |
| Locked-out user sees an error with icon | error text + `svg[data-icon='times']` visible |
| Invalid credentials are rejected | invalid-credentials error shown |
| Logout blocks direct access to the inventory | after logout, deep-link to inventory redirects to login (**route guard**) |

### 📦 Inventory — `Inventory.feature` (4)
| Scenario | Key assertions |
|----------|----------------|
| Inventory shows six products | exactly **6** products |
| Sort by price high to low | prices descending |
| Sort by name A to Z | names ascending |
| Open a product detail page | name + price **$29.99** + non-empty description + back button |

### 🛒 Shopping Cart — `Cart.feature` (3)
| Scenario | Key assertions |
|----------|----------------|
| Added items appear in the cart | both names present; **2** line items |
| Removing an item updates the count | count **1**; badge **"1"** |
| Cart persists after returning to shopping | badge still **1** |

### 💳 Checkout — `Checkout.feature` (4)
| Scenario | Key assertions |
|----------|----------------|
| First name is required | error **"Error: First Name is required"** |
| Subtotal matches a single item price | subtotal == **29.99** |
| Subtotal plus tax equals the total | **subtotal + tax == total** |
| Complete a two-item checkout end to end | sort → cart → checkout → **order confirmation** |

### 🌐 REST API — `Api.feature` (3)
| Scenario | Key assertions |
|----------|----------------|
| Fetch a post by id (**Scenario Outline**, ids 1/2/3) | 200; id matches; non-empty title/body |
| Fetch the full posts collection | 200; **100** items |
| Create a post | **201**; payload echoed; numeric id |

## Why this is a gold-standard SDET suite

- **Real BDD** — executable Gherkin specs read by non-engineers, bound to reusable Page Objects.
- **Tag-scoped hooks** — `@ui` starts a browser, `@api` starts an API request context; no browser is launched for API scenarios.
- **Scenario isolation** — Reqnroll context injection gives each scenario its own `PlaywrightDriver` (parallel-safe by scenario).
- **Failure artifacts** — full-page screenshot saved under `screenshots/` when a scenario fails.
- **Meaningful assertions** — exact counts, sort-order, `subtotal + tax = total`, and API schema/contract checks.
- **Data-driven** — `Scenario Outline` with an `Examples` table.

## Author

**Devbrat Verma** — Senior QA Automation Engineer | SDET

## License

MIT — see the repository `LICENSE`.
