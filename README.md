# 🔍 Google Search UI Tests (Playwright)

This project contains ONLY basic end-to-end tests written with [Playwright](https://playwright.dev/), targeting Google Search UI functionality.
Repository covers only searching functionality, with only an examples of assertions.

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/google-playwright-tests.git
cd google-playwright-tests
```

### 2. Install dependencies

Make sure you have [Node.js](https://nodejs.org/) installed (version 18+ recommended), then run:

```bash
npm install
```

### 3. Install Playwright browsers

Run this command once to download the required browsers (Chromium, Firefox, WebKit):

```bash
npx playwright install
```

---

## 🔪 Running the tests

Use the following command to run all tests in **headed mode** (with visible browser window):

```bash
npm run test:headed
```

This is especially useful for debugging or handling interactive flows like reCAPTCHA.

---

## ⚠️ Manual reCAPTCHA steps required

Two test scenarios involve **Google's reCAPTCHA**, which must be solved **manually** due to Google's anti-bot policy and terms of service:

* `Search text and check results`
* `Check if searching by graphic is possible`

When these tests run, you'll see a message in the terminal. The test will **WAIT for your action to continue**, and you should:

1. Switch to the test browser window.
2. Resolve the reCAPTCHA checkbox manually.
3. After that, after a few seconds test will  ▶️ `Resume` automatically.

> 🔐 Note: Automating reCAPTCHA is against Google’s terms. In real-world projects, this is typically not an issue because reCAPTCHA is disabled or mocked on dedicated test environments.
>
> 🗉 Additional Notes

Tested on Chromium, in English (en-GB) locale.

Compatible with Playwright v1.43+.
