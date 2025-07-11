# 🚀 OrangeHRM Cypress Automation

[![Cypress](https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white)](https://www.cypress.io/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Cucumber](https://img.shields.io/badge/Cucumber-43B02A?style=for-the-badge&logo=cucumber&logoColor=white)](https://cucumber.io/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ardanmuh/OrangeHRM-CypressW9)

Comprehensive end-to-end testing automation framework for OrangeHRM using Cypress with Cucumber BDD approach.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running Tests](#-running-tests)
- [Test Reports](#-test-reports)
- [Writing Tests](#-writing-tests)
- [Contributing](#-contributing)

## ✨ Features

### Core Features
- 🥒 **Cucumber BDD Framework** - Write tests in natural language using Gherkin syntax
- 📄 **Page Object Model** - Maintainable and reusable code structure
- 📊 **Mochawesome Reporting** - Beautiful HTML reports with screenshots and videos
- 🔧 **Custom Commands** - Reusable Cypress commands for common actions
- 
### Test Coverage
- 🔐 **Authentication Tests** - Login, logout, and session management
- 👥 **User Management** - CRUD operations for employee records

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **Cypress** | E2E Testing Framework | ^13.x |
| **Cucumber** | BDD Framework | ^20.x |
| **JavaScript** | Programming Language | ES6+ |
| **Mochawesome** | Test Reporting | ^7.x |
| **ESBuild** | Build Tool | ^0.19.x |
| **Node.js** | Runtime Environment | ^24.x |

## 📁 Project Structure

```
OrangeHRM-CypressW9/
│
├── 📂 cypress/
│   ├── 📂 e2e/
│   │   ├── 📂 features/          # Cucumber feature files
│   │   │   ├── login.feature
│   │   │   ├── dashboard.feature
│   │   │   ├── employee.feature
│   │   │   └── search.feature
│   │   └── 📂 step_definitions/  # Step definition files
│   │       ├── login_steps.js
│   │       ├── dashboard_steps.js
│   │       ├── employee_steps.js
│   │       └── common_steps.js
│   │
│   ├── 📂 support/
│   │   ├── 📂 page_objects/      # Page Object Model files
│   │   │   ├── BasePage.js
│   │   │   ├── LoginPage.js
│   │   │   ├── DashboardPage.js
│   │   │   └── EmployeePage.js
│   │   ├── commands.js           # Custom Cypress commands
│   │   └── e2e.js               # Global configuration
│   │
│   ├── 📂 fixtures/             # Test data files
│   │   ├── users.json
│   │   ├── employees.json
│   │   └── test_data.json
│   │
│   ├── 📂 reports/              # Generated test reports
│   │   ├── 📂 mochawesome/
│   │   ├── 📂 screenshots/
│   │   └── 📂 videos/
│   │
│   └── 📂 downloads/            # Downloaded files during tests
│
├── 📄 cypress.config.js         # Cypress configuration
├── 📄 package.json              # Dependencies and scripts
├── 📄 .gitignore               # Git ignore rules
└── 📄 README.md                # This file
```

## 🔧 Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Package manager
- **Git** - Version control system
- **Modern Browser** - Chrome, Firefox, or Edge

### System Requirements
- **OS**: Windows 10+, macOS 10.12+, or Linux
- **RAM**: Minimum 4GB (8GB recommended)
- **Storage**: 500MB free space

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/ardanmuh/OrangeHRM-CypressW9.git
cd OrangeHRM-CypressW9
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Verify Installation
```bash
npx cypress verify
```

## ⚙️ Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
# Application URLs
BASE_URL=https://opensource-demo.orangehrmlive.com
STAGING_URL=https://staging-orangehrm.com

# Test User Credentials
TEST_USERNAME=Admin
TEST_PASSWORD=admin123

# Test Configuration
DEFAULT_TIMEOUT=10000
RETRY_ATTEMPTS=2
BROWSER=chrome
```

### Cypress Configuration
The `cypress.config.js` file contains:
- **Base URL**: OrangeHRM demo site
- **Viewport**: 1280x720 resolution
- **Timeouts**: Request, response, and command timeouts
- **Reporters**: Mochawesome configuration
- **Cucumber**: BDD preprocessing setup

## 🏃‍♂️ Running Tests

### Interactive Mode (Cypress GUI)
```bash
# Open Cypress Test Runner
npx cypress open

# Open with specific browser
npm run cy:open -- --browser chrome
```

### Headless Mode (CI/CD)
```bash
# Run all tests
npx cypress run

# Run specific feature
npm run test -- --spec "cypress/e2e/features/login.feature"

# Run with specific browser
npm run test -- --browser firefox
```


## 📊 Test Reports

### Mochawesome Reports
After test execution, reports are generated in `cypress/reports/`:

- **HTML Report**: `mochawesome.html` - Interactive dashboard
- **JSON Report**: `mochawesome.json` - Raw test data
- **Screenshots**: Captured on test failures
- **Videos**: Optional recording of test execution

### Report Features
- ✅ **Test Summary** - Pass/fail statistics
- 📊 **Visual Charts** - Test results visualization
- 🖼️ **Screenshots** - Embedded failure screenshots
- 📱 **Responsive Design** - Mobile-friendly reports
- 🔍 **Search & Filter** - Find specific tests
- 📤 **Export Options** - Share reports easily

### Opening Reports
```bash
# Open latest report
npm run open:report

# Or manually open
open cypress/reports/mochawesome.html
```

## 📝 Writing Tests

### Feature File Example
```gherkin
Feature: User Login
  As a user
  I want to login to OrangeHRM
  So that I can access the system

  @smoke @login
  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter valid credentials
    And I click the login button
    Then I should be redirected to the dashboard
    And I should see the welcome message

  @negative @login
  Scenario: Failed login with invalid credentials
    Given I am on the login page
    When I enter invalid credentials
    And I click the login button
    Then I should see an error message
    And I should remain on the login page
```

### Step Definition Example
```javascript
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../support/page_objects/LoginPage';

const loginPage = new LoginPage();

Given('I am on the login page', () => {
  loginPage.visit();
});

When('I enter valid credentials', () => {
  cy.fixture('users').then((users) => {
    loginPage.enterCredentials(users.admin.username, users.admin.password);
  });
});

Then('I should be redirected to the dashboard', () => {
  cy.url().should('include', '/dashboard');
});
```

### Page Object Example
```javascript
class LoginPage {
  constructor() {
    this.elements = {
      usernameInput: '[name="username"]',
      passwordInput: '[name="password"]',
      loginButton: '[type="submit"]',
      errorMessage: '.oxd-alert-content'
    };
  }

  visit() {
    cy.visit('/');
  }

  enterCredentials(username, password) {
    cy.get(this.elements.usernameInput).type(username);
    cy.get(this.elements.passwordInput).type(password);
  }

  clickLogin() {
    cy.get(this.elements.loginButton).click();
  }

  getErrorMessage() {
    return cy.get(this.elements.errorMessage);
  }
}

export default LoginPage;
```


## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Getting Started
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Standards
- Follow JavaScript ES6+ standards
- Use ESLint and Prettier for code formatting
- Write clear, descriptive commit messages
- Include tests for new features
- Update documentation as needed

### Pull Request Process
1. Ensure all tests pass
2. Update README if needed
3. Request review from maintainers
4. Address review feedback
5. Merge after approval

## 🙏 Acknowledgments

- **OrangeHRM** - For providing the demo application
- **Cypress Team** - For the amazing testing framework
- **Cucumber** - For the BDD approach

## 📈 Project Stats

![GitHub stars](https://img.shields.io/github/stars/ardanmuh/OrangeHRM-CypressW9)
![GitHub forks](https://img.shields.io/github/forks/ardanmuh/OrangeHRM-CypressW9)
![GitHub issues](https://img.shields.io/github/issues/ardanmuh/OrangeHRM-CypressW9)
![GitHub license](https://img.shields.io/github/license/ardanmuh/OrangeHRM-CypressW9)

---

⭐ **Star this repository if you find it helpful!**

Made with ❤️ by [Arda Muhammadan](https://github.com/ardanmuh)
