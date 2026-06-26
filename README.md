# Test Automation Portfolio – Devbrat Verma

[![CI](https://github.com/devbartverma/test-automation-portfolio-devbrat/actions/workflows/ci.yml/badge.svg)](https://github.com/devbartverma/test-automation-portfolio-devbrat/actions/workflows/ci.yml)

A multi-language Playwright automation portfolio demonstrating Page Object Model design,
both **UI and API** layers, parallel-safe execution, failure artifacts, and a GitHub Actions
CI pipeline — across TypeScript, C# (.NET 8), Java (Groovy/Spock), and Python.

Every stack runs the **same 18 tests** (15 UI + 3 API) so the four are directly comparable.

---

## 🛠️ Frameworks

| Language | Location | Test Runner | UI | API | Test details |
|----------|----------|-------------|----|-----|--------------|
| TypeScript | `/js-ts-automation` | Playwright Test | 15 | 3 | [README](js-ts-automation/README.md) |
| C# / .NET 8 | `/dotnet-automation` | NUnit | 15 | 3 | [README](dotnet-automation/README.md) |
| Java + Groovy | `/java-automation` | JUnit 5 + Spock | 15 | 3 | [README](java-automation/README.md) |
| Python | `/python-automation` | pytest | 15 | 3 | [README](python-automation/README.md) |

Each suite covers the **same 15 UI scenarios** (SauceDemo) plus **3 API contract tests**
(JSONPlaceholder), with a consistent Page Object structure (`pages` / `data` / `tests`).

> 📖 **For a per-test breakdown — exactly what each test does and what it asserts — see the respective folder's README** (linked above). Each one documents all 15 cases grouped by Authentication / Inventory / Cart / Checkout.

---

## 🎯 Target Application

* **UI:** [https://www.saucedemo.com](https://www.saucedemo.com) — credentials `standard_user` / `secret_sauce`
* **API:** [https://jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com) — free public REST API

---

## ▶️ Running the Tests

`cd` into the folder first. `PWDEBUG=1` opens the Playwright Inspector (step through, pauses) and works in every stack.

### TypeScript — `js-ts-automation`
```bash
npm install && npx playwright install     # one-time
npm test                                   # all (UI cross-browser + API)
npx playwright test --headed               # headed
npx playwright test --debug                # debug (Inspector)
npx playwright test --ui                   # UI mode — time-travel & watch
npx playwright show-report                 # open the HTML report
```

### C# / .NET — `dotnet-automation`
```bash
dotnet test                                # all (headless)
HEADED=1 dotnet test                       # headed
PWDEBUG=1 dotnet test                      # debug (Inspector)
dotnet test --filter "Name~Checkout"       # run a subset
dotnet test --logger "trx;LogFileName=results.trx"   # TRX report
```

### Java — `java-automation`  *(requires Maven)*
```bash
mvn test                                   # all (headless)
HEADLESS=false mvn test                    # headed
PWDEBUG=1 mvn test                         # debug (Inspector)
mvn test -Dtest=ApiSpec                    # just the Spock API spec
mvn surefire-report:report                 # → target/site/surefire-report.html
```

### Python — `python-automation`
```bash
python -m venv venv && source venv/bin/activate        # one-time
pip install -r requirements.txt && playwright install  # one-time
pytest                                     # all (headless)
pytest --headed --slowmo 500               # headed + slowed down
PWDEBUG=1 pytest                           # debug (Inspector)
pytest -n auto                             # parallel (xdist)
pytest --html=report.html --self-contained-html        # report (pip install pytest-html)
```

> Headed toggles per framework: `--headed` (TS / Python), `HEADED=1` (.NET), `HEADLESS=false` (Java).
> Failure artifacts land in each suite's report / `screenshots/` (`target/screenshots/` for Java).

---

## ✅ Test Coverage (identical in all 4 languages)

**UI — SauceDemo (15)**
- **Authentication** (4) — valid login, locked-out user + error icon, invalid credentials, logout & route protection
- **Inventory** (4) — product count, sort by price, sort by name, product detail page
- **Cart** (3) — items shown with correct names, remove updates count, cart persists across navigation
- **Checkout** (4) — field validation, subtotal accuracy, price math (`subtotal + tax = total`), full end-to-end flow

**API — JSONPlaceholder (3)**
- GET single resource — status + **schema/contract** assertions, **data-driven** over several ids
- GET collection — status + full-collection size
- POST resource — `201`, payload echo, and a generated numeric id

*Every test, with its assertions and the gold-standard rationale, is documented in each [folder README](#️-frameworks).*

---

## ⚡ Engineering Practices

- **CI/CD** — GitHub Actions runs all four suites on every push/PR (see the badge above); failure artifacts are uploaded per job
- **Two test layers** — UI (Playwright) **and** API/contract (Playwright `APIRequest` / `requests`), so checks live at the cheapest reliable level
- **Parallel-safe by design** — TypeScript `fullyParallel`; Python isolates a browser per test (runs under `pytest -n auto`); Java uses a `ThreadLocal` factory; .NET `PageTest` gives each test its own context
- **Failure artifacts everywhere** — trace + screenshot + video (TS) and screenshot-on-failure hooks (Python / Java / .NET)
- **Genuinely data-driven** — parameterized tests (`@TestCase`, `@pytest.mark.parametrize`, Spock `where:`, TS loop), not just centralized constants
- **Real BDD in Spock** — the Java API suite uses true `given/when/then/where` blocks
- **Page Object Model** + centralized test data across all 4 languages
- **Resilient locators** (`data-test`) with auto-waiting — no hard sleeps
- **Financial assertion** — `subtotal + tax = total` verified in every UI suite

---

## 👨‍💻 Author

**Devbrat Verma** — QA Automation Engineer  
[GitHub](https://github.com/devbartverma)

---

## 📄 License
MIT