/**
 * Collection of default prompts for different use cases (ICE POT Format)
 */
export const DEFAULT_PROMPTS = {
 
  /**
   * Selenium Java Page Object Prompt (No Test Class)
   */
  SELENIUM_JAVA_PAGE_ONLY: `
    Instructions:
    - Generate ONLY a Selenium Java Page Object Class (no test code).
    - Add JavaDoc for methods & class.
    - Use Selenium 2.30+ compatible imports.
    - Use meaningful method names.
    - Do NOT include explanations or test code.

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`

    Example:
    \`\`\`java
    package com.testleaf.pages;

    /**
     * Page Object for Component Page
     */
    public class ComponentPage {
        // Add methods as per the DOM
    }
    \`\`\`

    Persona:
    - Audience: Automation engineer focusing on maintainable POM structure.

    Output Format:
    - A single Java class inside a \`\`\`java\`\`\` block.

    Tone:
    - Clean, maintainable, enterprise-ready.
  `,

  /**
   * Cucumber Feature File Only Prompt
   */
  CUCUMBER_ONLY: `
    Instructions:
    - Generate ONLY a Cucumber (.feature) file.
    - Use Scenario Outline with Examples table.
    - Make sure every step is relevant to the provided DOM.
    - Do not combine multiple actions into one step.
    - Use South India realistic dataset (names, addresses, pin codes, mobile numbers).
    - Use dropdown values only from provided DOM.
    - Generate multiple scenarios if applicable.

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`

    Example:
    \`\`\`gherkin
    Feature: Login to OpenTaps

    Scenario Outline: Successful login with valid credentials
      Given I open the login page
      When I type "<username>" into the Username field
      And I type "<password>" into the Password field
      And I click the Login button
      Then I should be logged in successfully

    Examples:
      | username   | password  |
      | "testuser" | "testpass"|
      | "admin"    | "admin123"|
    \`\`\`

    Persona:
    - Audience: BDD testers who only need feature files.

    Output Format:
    - Only valid Gherkin in a \`\`\`gherkin\`\`\` block.

    Tone:
    - Clear, structured, executable.
  `,

  /**
   * Cucumber with Step Definitions
   */
  CUCUMBER_WITH_SELENIUM_JAVA_STEPS: `
    Instructions:
    - Generate BOTH:
      1. A Cucumber .feature file.
      2. A Java step definition class for selenium.
    - Do NOT include Page Object code.
    - Step defs must include WebDriver setup, explicit waits, and actual Selenium code.
    - Use Scenario Outline with Examples table (South India realistic data).

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`
    URL: \${pageUrl}

    Example:
    \`\`\`gherkin
    Feature: Login to OpenTaps

    Scenario Outline: Successful login with valid credentials
      Given I open the login page
      When I type "<username>" into the Username field
      And I type "<password>" into the Password field
      And I click the Login button
      Then I should be logged in successfully

    Examples:
      | username   | password  |
\      | "admin"    | "admin123"|
    \`\`\`

    \`\`\`java
    package com.leaftaps.stepdefs;

    import io.cucumber.java.en.*;
    import org.openqa.selenium.*;
    import org.openqa.selenium.chrome.ChromeDriver;
    import org.openqa.selenium.support.ui.*;

    public class LoginStepDefinitions {
        private WebDriver driver;
        private WebDriverWait wait;

        @io.cucumber.java.Before
        public void setUp() {
            driver = new ChromeDriver();
            wait = new WebDriverWait(driver, Duration.ofSeconds(10));
            driver.manage().window().maximize();
        }

        @io.cucumber.java.After
        public void tearDown() {
            if (driver != null) driver.quit();
        }

        @Given("I open the login page")
        public void openLoginPage() {
            driver.get("\${pageUrl}");
        }

        @When("I type {string} into the Username field")
        public void enterUsername(String username) {
            WebElement el = wait.until(ExpectedConditions.elementToBeClickable(By.id("username")));
            el.sendKeys(username);
        }

        @When("I type {string} into the Password field")
        public void enterPassword(String password) {
            WebElement el = wait.until(ExpectedConditions.elementToBeClickable(By.id("password")));
            el.sendKeys(password);
        }

        @When("I click the Login button")
        public void clickLogin() {
            driver.findElement(By.xpath("//button[contains(text(),'Login')]")).click();
        }

        @Then("I should be logged in successfully")
        public void verifyLogin() {
            WebElement success = wait.until(ExpectedConditions.visibilityOfElementLocated(By.className("success")));
            assert success.isDisplayed();
        }
    }
    \`\`\`

    Persona:
    - Audience: QA engineers working with Cucumber & Selenium.

    Output Format:
    - Gherkin in \`\`\`gherkin\`\`\` block + Java code in \`\`\`java\`\`\` block.

    Tone:
    - Professional, executable, structured.
  `,
  
  /**
   * Selenium C# Page Object Prompt (No Test Class)
   */
  SELENIUM_CSHARP_PAGE_ONLY: `
    Instructions:
    - Generate ONLY a Selenium C# Page Object Class (no test code).
    - Use OpenQA.Selenium (IWebDriver/IWebElement) and follow C# naming conventions.
    - Include a constructor that accepts an IWebDriver and store it in a readonly field.
    - Provide simple XML-doc style comments for public methods.
    - Output a single C# class file content as plain text (no extra markdown wrappers).

  Context: \${domContent}

    Example (description):
    - Using OpenQA.Selenium
    - Class with IWebDriver, constructor and methods for interactions derived from DOM

    Tone: Clean, maintainable, enterprise-ready.
  `,

  /**
   * Cucumber + Selenium step definitions for C# (feature + step defs)
   */
  CUCUMBER_WITH_SELENIUM_CSHARP_STEPS: `
    Instructions:
    - Generate BOTH: a Cucumber .feature file and a C# SpecFlow/NUnit step definitions class for Selenium.
    - Include IWebDriver setup/teardown, waits and Selenium interactions in step defs.
    - Do NOT include Page Object code; page objects can be generated separately.
    - Use Scenario Outline with Examples table and realistic test data.

  Context: \${domContent}
  URL: \${pageUrl}

    Output: Two artifacts as plain text: the Gherkin feature and the C# step definitions (no markdown wrappers).

    Tone: Professional, executable, structured.
  `,
   
    /**
   * Playwright Typescript Page Object Prompt (No Test Class)
   */   
     
    PLAYWRIGHT_TYPESCRIPT_PAGE_ONLY:`
    Instructions:
    - Generate ONLY a Playwright TypeScript Page Object Class (no test code).
    - Use Playwright 1.30+ compatible imports.
    - Add TypeDoc comments for class and methods.
    - Use meaningful method and locator names.
    - Use \`Locator\` and \`Page\` appropriately with \`@playwright/test\`.
    - Do NOT include explanations or test code..

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`

    Example:
    \`\`\`Typescript
    Example:
    import { Locator, Page } from '@playwright/test';

**
 * Page Object for Component Page
 */
export class ComponentPage {
  private page: Page;
  
  constructor(page: Page) {
    this.page = page;
    // Define locators here
  }

  // Add methods as per the DOM
}

    Persona:
    - Audience: Automation engineer focusing on maintainable POM structure using Playwright.

    Output Format:
    - A single TypeScript class inside a ts block.

    Tone:
    - Clean, maintainable, enterprise-ready.
   `,

   /**
   * Cucumber with Step Definitions
   */
   CUCUMBER_WITH_PLAYWRIGHT_TYPESCRIPT_STEPS: `
    Instructions:
    - Generate BOTH:
      1. A Cucumber .feature file.
      2. A Java step definition class for Playwright.
    - Do NOT include Page Object code.
    - Step defs must include WebDriver setup, explicit waits, and actual Selenium code.
    - Use Scenario Outline with Examples table (South India realistic data).

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`
    URL: \${pageUrl}

    Example:
    \`\`\`gherkin
    Feature: Login to OpenTaps

    Scenario Outline: Successful login with valid credentials
      Given I open the login page
      When I type "<username>" into the Username field
      And I type "<password>" into the Password field
      And I click the Login button
      Then I should be logged in successfully

    Examples:
      | username   | password  |
\      | "admin"    | "admin123"|
    \`\`\`

    \`\`\`Typescript
    package com.allevasoft.stepdefs;

import io.cucumber.java.After;
import io.cucumber.java.Before;
import io.cucumber.java.en.*;

import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.*;

import java.time.Duration;

public class LoginStepDefinitions {

    private WebDriver driver;
    private WebDriverWait wait;

    private static final String LOGIN_URL = "https://identity.allevasoft.com/allevaauthprod.onmicrosoft.com/b2c_1a_si/oauth2/v2.0/authorize?client_id=b1e06e66-b861-4bb3-8ca0-ddaf5072b449&response_type=code%20id_token&scope=openid%20profile%20offline_access%20https%3A%2F%2Fallevaauthprod.onmicrosoft.com%2F6ed60b42-9880-4dad-a214-b4a9523db65d%2FTasks.Read%20https%3A%2F%2Fallevaauthprod.onmicrosoft.com%2F6ed60b42-9880-4dad-a214-b4a9523db65d%2FTasks.Write&state=OpenIdConnect.AuthenticationProperties%3Dh3fVVo14SCR4p5wvc3LHecb9VfwgwgrAsm887C1cHfBv5cuCUFvypvOQqug_zDsP-90Mcq43kTELeQR071QG4LWjjqkl7Ud4CBNLiYFqgOvjxAs2DmPb7o3YT000GnlyDQ_KbuBVrrJvTJdgX6PcRQ&response_mode=form_post&nonce=638967035812862368.ZTI4ZjgwOGEtODBlNC00OTZmLTk2NDQtMzQxM2RkYWE3ZTgyZDY0MDkzNTQtOTQyZC00MzViLTkxYzQtYmUzNjRmMzBhNzA1&redirect_uri=https%3A%2F%2Fbilling.allevasoft.com%2Fsignin-oidc&x-client-SKU=ID_NET472&x-client-ver=8.3.1.0";

    @Before
    public void setUp() {
        // Assuming chromedriver is on the system PATH
        driver = new ChromeDriver();
        wait = new WebDriverWait(driver, Duration.ofSeconds(15));
        driver.manage().window().maximize();
    }

    @After
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }

    @Given("I open the Allevasoft login page")
    public void openLoginPage() {
        driver.get(LOGIN_URL);
        // Wait for the form to be present
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("localAccountForm")));
    }

    @When("I type {string} into the Username field")
    public void typeUsername(String username) {
        // The username input has id="signInName"
        By usernameLocator = By.id("signInName");
        WebElement usernameInput = wait.until(ExpectedConditions.elementToBeClickable(usernameLocator));
        usernameInput.clear();
        usernameInput.sendKeys(username);
    }

    @When("I type {string} into the Password field")
    public void typePassword(String password) {
        // The password input has id="password"
        By passwordLocator = By.id("password");
        WebElement passwordInput = wait.until(ExpectedConditions.elementToBeClickable(passwordLocator));
        passwordInput.clear();
        passwordInput.sendKeys(password);
    }

    @When("I click the Login button")
    public void clickLoginButton() {
        // The login button has id="next"
        By loginBtnLocator = By.id("next");
        WebElement loginBtn = wait.until(ExpectedConditions.elementToBeClickable(loginBtnLocator));
        loginBtn.click();
    }

    @Then("I should be logged in successfully")
    public void verifySuccessfulLogin() {
        // After a successful login the page typically redirects.
        // We'll wait for the URL to contain the expected redirect URI
        String expectedRedirect = "https://billing.allevasoft.com/signin-oidc";
        boolean redirected = wait.until(driver -> driver.getCurrentUrl().startsWith(expectedRedirect));

        if (!redirected) {
            // As a fallback, check that the error message is not visible
            By errorLocator = By.cssSelector("div.error.pageLevel[aria-hidden='true']");
            WebElement errorDiv = driver.findElement(errorLocator);
            if (errorDiv.isDisplayed()) {
                throw new AssertionError("Login failed – error message displayed.");
            }
        }
    }
}
    \`\`\`

    Persona:
    - Audience: QA engineers working with Cucumber & Playwright.

    Output Format:
    - Gherkin in \`\`\`gherkin\`\`\` block + Typescript code in \`\`\`Typescript\`\`\` block.

    Tone:
    - Professional, executable, structured.
  `,

     /**
   * Cypress Typescript Page Object Prompt (No Test Class)
   */   
     
    CYPRESS_TYPESCRIPT_PAGE_ONLY:`
    Instructions:
    - Generate ONLY a Cypress Typescript Page Object Class (no test code).
    - Add JSDoc for methods & class.
    - Use cypress 11.30+ compatible imports.
    - Use meaningful method names.
    - Do NOT include explanations or test code.

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`

    Example:
    \`\`\`Typescript
    export default class LoginPage {
  /** Selector for the username input field */
  private get usernameInput(): string {
    return '#signInName';
  }

  /** Selector for the password input field */
  private get passwordInput(): string {
    return '#password';
  }

  /** Selector for the "show password" toggle icon */
  private get showPasswordIcon(): string {
    return '.show-password-icon';
  }

  /** Selector for the "Forgot Password?" link */
  private get forgotPasswordLink(): string {
    return '#forgotPassword';
  }

  /** Selector for the login button */
  private get loginButton(): string {
    return '#next';
  }

  /** Selector for the page‑level error container */
  private get pageErrorContainer(): string {
    return '.error.pageLevel';
  }

  /** Selector for the username field error container */
  private get usernameErrorContainer(): string {
    return '.entry-item:has(#signInName) .error.itemLevel';
  }

  /** Selector for the password field error container */
  private get passwordErrorContainer(): string {
    return '.entry-item:has(#password) .error.itemLevel';
  }

  /**
   * Types a username into the username input.
   *
   * @param username - The username to enter.
   * @returns Chainable containing the input element.
   */
  typeUsername(username: string): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.usernameInput).clear().type(username);
  }

  /**
   * Types a password into the password input.
   *
   * @param password - The password to enter.
   * @returns Chainable containing the input element.
   */
  typePassword(password: string): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.passwordInput).clear().type(password);
  }

  /**
   * Clicks the "show password" icon to toggle password visibility.
   *
   * @returns Chainable containing the icon element.
   */
  toggleShowPassword(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.showPasswordIcon).click();
  }

  /**
   * Clicks the "Forgot Password?" link.
   *
   * @returns Chainable containing the link element.
   */
  clickForgotPassword(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.forgotPasswordLink).click();
  }

  /**
   * Clicks the login button to submit the form.
   *
   * @returns Chainable containing the button element.
   */
  clickLogin(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.loginButton).click();
  }

  /**
   * Retrieves the page‑level error message text.
   *
   * @returns Chainable containing the error paragraph element.
   */
  getPageErrorMessage(): Cypress.Chainable<JQuery<HTMLParagraphElement>> {
    return cy.get(this.pageErrorContainer).find('p');
  }

  /**
   * Retrieves the username field error message text.
   *
   * @returns Chainable containing the error paragraph element.
   */
  getUsernameErrorMessage(): Cypress.Chainable<JQuery<HTMLParagraphElement>> {
    return cy.get(this.usernameErrorContainer).find('p');
  }

  /**
   * Retrieves the password field error message text.
   *
   * @returns Chainable containing the error paragraph element.
   */
  getPasswordErrorMessage(): Cypress.Chainable<JQuery<HTMLParagraphElement>> {
    return cy.get(this.passwordErrorContainer).find('p');
  }

  /**
   * Checks whether the login button is enabled.
   *
   * @returns Chainable that yields a boolean.
   */
  isLoginButtonEnabled(): Cypress.Chainable<boolean> {
    return cy.get(this.loginButton).then($btn => !$btn.is(':disabled'));
  }

  /**
   * Clears both username and password fields.
   *
   * @returns Chainable containing the password input after clearing.
   */
  clearCredentials(): Cypress.Chainable<JQuery<HTMLElement>> {
    cy.get(this.usernameInput).clear();
    return cy.get(this.passwordInput).clear();
  }
}
    \`\`\`

    Persona:
    - Audience: Automation engineer focusing on maintainable POM structure.

    Output Format:
    - A single cypress class inside a \`\`\`Typescript\`\`\` block.

    Tone:
    - Clean, maintainable, enterprise-ready.
   `,

    /**
   * Cucumber with Cypress Step Definitions
   */
   CUCUMBER_WITH_CYPRESS_TYPESCRIPT_STEPS: `
    Instructions:
    - Generate BOTH:
      1. A Cucumber .feature file.
      2. A Typescript step definition class for Cypress.
    - Do NOT include Page Object code.
    - Step defs must include WebDriver setup, explicit waits, and actual Cypress code.
    - Use Scenario Outline with Examples table (South India realistic data).

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`
    URL: \${pageUrl}

    Example:
    \`\`\`gherkin
    Feature: Login to OpenTaps

    Scenario Outline: Successful login with valid credentials
      Given I open the login page
      When I type "<username>" into the Username field
      And I type "<password>" into the Password field
      And I click the Login button
      Then I should be logged in successfully

    Examples:
      | username   | password  |
\      | "admin"    | "admin123"|
    \`\`\`

    \`\`\`Typescript
    import { Chainable } from 'cypress';
    import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
    import 'cypress-wait-until';

    export default class LoginPage {
  /** Selector for the username input field */
  private get usernameInput(): string {
    return '#signInName';
  }

  /** Selector for the password input field */
  private get passwordInput(): string {
    return '#password';
  }

  /** Selector for the "show password" toggle icon */
  private get showPasswordIcon(): string {
    return '.show-password-icon';
  }

  /** Selector for the "Forgot Password?" link */
  private get forgotPasswordLink(): string {
    return '#forgotPassword';
  }

  /** Selector for the login button */
  private get loginButton(): string {
    return '#next';
  }

  /** Selector for the page‑level error container */
  private get pageErrorContainer(): string {
    return '.error.pageLevel';
  }

  /** Selector for the username field error container */
  private get usernameErrorContainer(): string {
    return '.entry-item:has(#signInName) .error.itemLevel';
  }

  /** Selector for the password field error container */
  private get passwordErrorContainer(): string {
    return '.entry-item:has(#password) .error.itemLevel';
  }

  /**
   * Types a username into the username input.
   *
   * @param username - The username to enter.
   * @returns Chainable containing the input element.
   */
  typeUsername(username: string): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.usernameInput).clear().type(username);
  }

  /**
   * Types a password into the password input.
   *
   * @param password - The password to enter.
   * @returns Chainable containing the input element.
   */
  typePassword(password: string): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.passwordInput).clear().type(password);
  }

  /**
   * Clicks the "show password" icon to toggle password visibility.
   *
   * @returns Chainable containing the icon element.
   */
  toggleShowPassword(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.showPasswordIcon).click();
  }

  /**
   * Clicks the "Forgot Password?" link.
   *
   * @returns Chainable containing the link element.
   */
  clickForgotPassword(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.forgotPasswordLink).click();
  }

  /**
   * Clicks the login button to submit the form.
   *
   * @returns Chainable containing the button element.
   */
  clickLogin(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.loginButton).click();
  }

  /**
   * Retrieves the page‑level error message text.
   *
   * @returns Chainable containing the error paragraph element.
   */
  getPageErrorMessage(): Cypress.Chainable<JQuery<HTMLParagraphElement>> {
    return cy.get(this.pageErrorContainer).find('p');
  }

  /**
   * Retrieves the username field error message text.
   *
   * @returns Chainable containing the error paragraph element.
   */
  getUsernameErrorMessage(): Cypress.Chainable<JQuery<HTMLParagraphElement>> {
    return cy.get(this.usernameErrorContainer).find('p');
  }

  /**
   * Retrieves the password field error message text.
   *
   * @returns Chainable containing the error paragraph element.
   */
  getPasswordErrorMessage(): Cypress.Chainable<JQuery<HTMLParagraphElement>> {
    return cy.get(this.passwordErrorContainer).find('p');
  }

  /**
   * Checks whether the login button is enabled.
   *
   * @returns Chainable that yields a boolean.
   */
  isLoginButtonEnabled(): Cypress.Chainable<boolean> {
    return cy.get(this.loginButton).then($btn => !$btn.is(':disabled'));
  }

  /**
   * Clears both username and password fields.
   *
   * @returns Chainable containing the password input after clearing.
   */
  clearCredentials(): Cypress.Chainable<JQuery<HTMLElement>> {
    cy.get(this.usernameInput).clear();
    return cy.get(this.passwordInput).clear();
  }
}
    \`\`\`

    Persona:
    - Audience: QA engineers working with Cucumber & Cypress.

    Output Format:
    - Gherkin in \`\`\`gherkin\`\`\` block + Typescript code in \`\`\`Typescript\`\`\` block.

    Tone:
    - Professional, executable, structured.
  `,

  /** TEST DATA CREATION FOR THE GIVEN DOM */
  TEST_DATA_ONLY: `
    Instructions:
    - Generate ONLY test data in JSON format.
    - Create realistic South India-centric data (names, addresses, pin codes, mobile numbers).
    - Ensure data matches the fields in the provided DOM.
    - Include at least 5 unique records.
    - Use appropriate data types (e.g., strings for names, numbers for pin codes).
    - Generate postive, negative, and boundary test cases where applicable.

    Context:
    DOM:
    \`\`\`html
    \${domContent}
    \`\`\`

    Example:
    \`\`\`json
    [
      {
        "firstName": "Ravi",
        "lastName": "Kumar",
        "email": "  
      } 
  ]
      \`\`\`
  `,
  /** TEST DATA for the given Feature file for each scenario */
  TEST_DATA_FOR_FEATURE: `
    Instructions:
    - Generate ONLY test data in JSON format for the provided Cucumber feature file.
    - Create realistic South India-centric data (names, addresses, pin codes, mobile numbers).
    - Ensure data matches the fields and scenarios in the provided feature file.
    - Include at least 5 unique records per scenario.
    - Use appropriate data types (e.g., strings for names, numbers for pin codes).
    - Generate positive, negative, and boundary test cases where applicable.

    Context:
    Feature File:
    \`\`\`gherkin
    \${featureFileContent}
    \`\`\`

    Example:
    \`\`\`json
    [
      {
        "firstName": "Ravi",
        "lastName": "Kumar",
        "email": "  

      }
    ] 
    \`\`\`
    `,
    /** TEST DATA for the given Page Object Model code - SELENIUM JAVA */

  TEST_DATA_FOR_SELENIUM_PAGE: `
Instructions:
- Generate ONLY test data in JSON format for the provided Selenium Java Page Object class.
- Data must align with the fields, locators, and methods defined in the provided Java class.
- Create realistic South India-centric data (names, addresses, pin codes, mobile numbers).
- Include at least 5 unique records.
- Use appropriate data types (e.g., strings for names, numbers for pin codes).
- Ensure test data includes positive, negative, and boundary value cases wherever applicable.
- Avoid adding explanations or comments.

Context:  
    Page Object Class:  
      \`\`\`java
        \${pageObjectContent}
      \`\`\`

Example:  
\`\`\`json
[
  {
    "firstName": "Ravi",
    "lastName": "Kumar",
    "email": "ravi.kumar@gmail.com",
    "phone": "9876543210",
    "pinCode": 600001,
    "address": "12/5 Ranganathan Street, T Nagar, Chennai"
  }
]
\`\`\`
`,
/** TEST DATA for the given Page object model code - PLAYWRIGHT TYPESCRIPT */

  TEST_DATA_FOR_PLAYWRIGHT_PAGE: `
  Instructions:
  - Generate ONLY test data in JSON format for the provided Playwright TypeScript Page Object class.
  - Data must align with the fields, locators, and methods defined in the provided TypeScript code.
  - Create realistic South India-centric data (names, addresses, pin codes, mobile numbers).
  - Include at least 5 unique records.
  - Use appropriate data types (e.g., strings for names, numbers for pin codes).
  - Ensure test data includes positive, negative, and boundary value cases wherever applicable.
  - Avoid adding explanations or comments.

Context:  
    Page Object Class:  
      \`\`\`ts
        \${pageObjectContent}
      \`\`\`

Example:  
\`\`\`json
[
  {
    "firstName": "Ravi",
    "lastName": "Kumar",
    "email": "ravi.kumar@gmail.com",
    "phone": "9876543210",
    "pinCode": 600001,
    "address": "12/5 Ranganathan Street, T Nagar, Chennai"
  }
]
\`\`\`


    `,


  /** TEST DATA for the given Page object model code - CYPRESS TYPESCRIPT */
  TEST_DATA_FOR_CYPRESS_PAGE: `
  Instructions:
  - Generate ONLY test data in JSON format for the provided Cypress TypeScript Page Object class.
  - Data must align with the fields, locators, and methods defined in the provided TypeScript code.
  - Create realistic South India-centric data (names, addresses, pin codes, mobile numbers).
  - Include at least 5 unique records.
  - Use appropriate data types (e.g., strings for names, numbers for pin codes).
  - Ensure test data includes positive, negative, and boundary value cases wherever applicable.
  - Avoid adding explanations or comments.

Context:  
    Page Object Class:  
      \`\`\`ts
        \${pageObjectContent}
      \`\`\`

Example:  
\`\`\`json
[
  {
    "firstName": "Ravi",
    "lastName": "Kumar",
    "email": "ravi.kumar@gmail.com",
    "phone": "9876543210",
    "pinCode": 600001,
    "address": "12/5 Ranganathan Street, T Nagar, Chennai"
  }
]
\`\`\`


    `,

    /** TEST DATA for the given Page Object model code - SELENIUM CSHARP */
  TEST_DATA_FOR_SELENIUM_CSHARP_PAGE: `
Instructions:
- Generate ONLY test data in JSON format for the provided Selenium C# Page Object class.
- Data must align with the fields, locators, and methods defined in the provided C# class.
- Create realistic South India-centric data (names, addresses, pin codes, mobile numbers).
- Include at least 5 unique records.
- Use appropriate data types (e.g., strings for names, numbers for pin codes).
- Ensure test data includes positive, negative, and boundary value cases wherever applicable.
- Avoid adding explanations or comments.

Context:
    Page Object Class:
      \`\`\`csharp
        \${pageObjectContent}
      \`\`\`

Example:
\`\`\`json
[
  {
    "firstName": "Ravi",
    "lastName": "Kumar",
    "email": "
    "phone": "9876543210",
    "pinCode": 600001,
    "address": "12/5 Ranganathan Street, T Nagar, Chennai"
  }
]
\`\`\`
`,
};


    
/**
 * Helper function to escape code blocks in prompts
 */
function escapeCodeBlocks(text) {
  return text.replace(/```/g, '\\`\\`\\`');
}

/**
 * Function to fill template variables in a prompt
 */
export function getPrompt(promptKey, variables = {}) {
  let prompt = DEFAULT_PROMPTS[promptKey];
  if (!prompt) {
    throw new Error(`Prompt not found: ${promptKey}`);
  }

  Object.entries(variables).forEach(([k, v]) => {
    const regex = new RegExp(`\\$\\{${k}\\}`, 'g');
    prompt = prompt.replace(regex, v);
  });

  return prompt.trim();
}

export const CODE_GENERATOR_TYPES = {
  SELENIUM_JAVA_PAGE_ONLY: 'Selenium-Java-Page-Only',
  CUCUMBER_ONLY: 'Cucumber-Only',
  CUCUMBER_WITH_SELENIUM_JAVA_STEPS: 'Cucumber-With-Selenium-Java-Steps',
  
  PLAYWRIGHT_TYPESCRIPT_PAGE_ONLY: 'Playwright-Typescript-Page-Only',
  CUCUMBER_WITH_PLAYWRIGHT_TYPESCRIPT_STEPS: 'Cucumber-With-Playwright-Typescript-Steps',
  
  CYPRESS_TYPESCRIPT_PAGE_ONLY: 'Cypress-Typescript-Page-Only',
  CUCUMBER_WITH_CYPRESS_TYPESCRIPT_STEPS: 'Cucumber-With-Cypress-Typescript-Steps',

  SELENIUM_CSHARP_PAGE_ONLY: 'Selenium-CSharp-Page-Only',
  CUCUMBER_WITH_SELENIUM_CSHARP_STEPS: 'Cucumber-With-Selenium-CSharp-Steps',
  
  TEST_DATA_ONLY: 'Test-Data-Only',
  TEST_DATA_FOR_FEATURE: 'Test-Data-For-Feature',
  
  TEST_DATA_FOR_SELENIUM_PAGE: 'Test-Data-For-Selenium-Page',
  TEST_DATA_FOR_PLAYWRIGHT_PAGE: 'Test-Data-For-Playwright-Page',
  TEST_DATA_FOR_CYPRESS_PAGE: 'Test-Data-For-Cypress-Page',
  TEST_DATA_FOR_SELENIUM_CSHARP_PAGE: 'Test-Data-For-Selenium-CSharp-Page'
}
 
