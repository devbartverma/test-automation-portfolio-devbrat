# C# Playwright Automation – Devbrat Verma

A modern UI test automation framework built with **C#, .NET 8, NUnit, and Playwright**, demonstrating scalable test architecture, maintainable automation design patterns, and QA engineering best practices used in enterprise software development.

> Framework designed and implemented by Devbrat Verma to demonstrate enterprise-grade UI test automation using Playwright for .NET, C#, Page Object Model (POM), reporting, and scalable test architecture.

## Overview

This repository showcases my approach to designing and implementing robust automated testing solutions using Playwright for .NET. The framework includes end-to-end test scenarios against public demo applications and demonstrates clean code practices, maintainability, and reliability in test automation.

## Technology Stack

* C#
* .NET 8
* Playwright for .NET
* NUnit
* Page Object Model (POM)
* HTML Reporting
* Data-Driven Testing
* Cross-Browser Execution

## Framework Features

### Architecture & Design

* Page Object Model (POM) implementation
* Reusable and maintainable page classes
* Centralized test data management
* Clear separation of test logic and page interactions
* Scalable framework structure suitable for enterprise projects

### Automation Best Practices

* Reliable locator strategies to minimize flaky tests
* Data-driven test execution
* Cross-browser testing (Chromium, Firefox, WebKit)
* Detailed execution reporting and test artifacts
* Positive and negative scenario coverage
* Reusable test components and utilities

## Sample Automated Scenarios

The framework currently includes automated coverage for:

* User authentication
* Product inventory validation
* Product detail verification
* Shopping cart workflows
* Checkout process validation
* UI assertions and business flow verification

## Project Structure

```text
csharp-automation/
├── TestResults/
│   ├── HtmlReport/
│   ├── HtmlReportTrx/
│   └── TestResults.trx
│
├── playwrite/
│   ├── Pages/
│   │   ├── LoginPage.cs
│   │   ├── InventoryPage.cs
│   │   ├── ProductDetailPage.cs
│   │   ├── CartPage.cs
│   │   └── CheckoutPage.cs
│   │
│   ├── data/
│   │   ├── TestData.cs
│   │   └── ProductData.cs
│   │
│   └── tests/
│       ├── AuthTests.cs
│       ├── InventoryTests.cs
│       └── CheckoutTests.cs
│
├── CSharpPlaywright.csproj
└── README.md
```

## Purpose

This portfolio project demonstrates my expertise in designing, developing, and maintaining modern test automation frameworks using Playwright for .NET and C#. It reflects the engineering practices I use to build scalable, reliable, and maintainable automation solutions for web applications.

## Author

**Devbrat Verma**

Senior QA Automation Engineer | SDET | Quality Engineering Lead

Specializing in Test Automation, Quality Engineering, and DevOps practices using Playwright, Cypress, Serenity BDD, SpecFlow, Reqnroll, JavaScript, TypeScript, Java, Groovy, and C#, with expertise in scalable automation frameworks, CI/CD pipelines, and AI-assisted testing.
