# Playwright Test Framework (TypeScript)

## Description
This project is a basic test automation framework using Playwright and TypeScript. It is designed as a foundation for Page Object Model (POM) and component-based architecture.

The goal of this project is to prepare a clean structure for future automated tests.

## Installation

Install dependencies:
npm install

Install Playwright browsers:
npx playwright install

## Run tests

Run all tests:
npx playwright test

Open HTML report:
npx playwright show-report

## Project Structure

- tests/ – test files
- pages/ – base page structure
- components/ – reusable components
- fixtures/ – test setup data
- utils/ – environment config and helpers

## Environment variables

Create .env file based on .env.example

Example:
BASE_URL=https://example.com  
HEADLESS=true  
RETRIES=0  
TIMEOUT=30000

## Notes

This project is only the initial setup for a Playwright framework and does not include Page Object Model implementation yet.