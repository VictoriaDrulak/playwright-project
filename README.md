# Playwright Test Framework — GreenCity (TypeScript)

## Description
This project is a test automation framework using Playwright and TypeScript, built for the [GreenCity](https://www.greencity.cx.ua/#/greenCity) web application.
It follows Page Object Model (POM) and component-based architecture, and uses Allure for test reporting.

## Allure Report
https://victoriadrulak.github.io/playwright-project/

## Installation

Install dependencies:
npm install

Install Playwright browsers:
npx playwright install

## Run tests

Run all tests:
npx playwright test

Run a single test:
npx playwright test tests/cancel-news.spec.ts

Open HTML report:
npx playwright show-report

## Allure Report

Generate report:
npx allure generate allure-results --clean -o allure-report

Open report:
npx allure open allure-report

## Project Structure

- tests/      – test files
- pages/      – Page Object classes
- components/ – reusable UI components
- fixtures/   – test setup data
- utils/      – environment config and helpers

## Environment variables

Create .env file based on .env.example:

BASE_URL=https://www.greencity.cx.ua/#/greenCity
HEADLESS=true
RETRIES=1
TIMEOUT=30000
EMAIL=your@email.com
PASSWORD=yourpassword

## Test Cases

TC-01 | Create News form fields    | create-news-form.spec.ts
TC-02 | Title field validation     | title-validation.spec.ts
TC-03 | Tags validation            | tags-validation.spec.ts
TC-04 | Image upload validation    | image-upload.spec.ts
TC-05 | Main Text validation       | text-validation.spec.ts
TC-06 | Source field validation    | source-validation.spec.ts
TC-07 | Cancel button modal        | cancel-news.spec.ts
TC-08 | Preview news               | preview-news.spec.ts
TC-09 | Edit button visibility     | edit-button-visibility.spec.ts
TC-10 | Edit news                  | edit-news.spec.ts