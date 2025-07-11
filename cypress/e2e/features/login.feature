Feature: User Login Authentication

  Background:
    Given user is on the login page

  Scenario Outline: User logs in with valid credentials
    When user logs in using username "<username>" and password "<password>"
    Then user should see the dashboard page

    Examples:
      | username | password |
      | Admin    | admin123 |

  Scenario: Login with invalid credentials (Negative Test)
    When user logs in using username "InvalidUser" and password "InvalidPass"
    Then user should see error message "Invalid credentials"

  Scenario: Login with empty credentials (Negative Test)
    When user logs in using username "" and password ""
    Then user should see error message "Required"

  Scenario: Login with valid username but invalid password (Negative Test)
    When user logs in using username "Admin" and password "wrongpassword"
    Then user should see error message "Invalid credentials"