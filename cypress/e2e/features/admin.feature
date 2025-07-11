Feature: Admin User Management

  Background:
    Given user is logged in as admin
    And user navigates to Admin page

  Scenario Outline: Add new admin user
    When user adds a new admin "<newUsername>" with role "<role>"
    And user should see success message
    Then the admin "<newUsername>" should appear in the user list

    Examples:
      | newUsername  | role  |
      | cypressuser1 | ESS   |
      | cypressuser2 | Admin |

  Scenario: Add admin user with duplicate username (Negative Test)
    Given user has created a new admin "cypressuser1" with role "Admin"
    When user should see duplicate username error message 
    Then user tries to add a duplicate admin "cypressuser1" with role "Admin"

  Scenario: Add admin user with empty username (Negative Test)
    When user tries to add admin with empty username and role "Admin"
    Then user should see required field error message

  Scenario: Search for existing admin user
    Given an admin "cypressuser2" with role "Admin" exists in the system
    When user searches for admin "cypressuser2"
    Then user should see "cypressuser2" in search results

  Scenario: Delete admin user
    Given an admin "cypressuser2" with role "Admin" exists in the system
    When user deletes admin "cypressuser2"
    Then user should see delete success message
    And "cypressuser2" should not appear in user list