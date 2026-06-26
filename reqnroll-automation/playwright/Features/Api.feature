@api
Feature: REST API contract
  As an SDET
  I want to validate the API at the cheapest reliable layer
  So that contracts are guaranteed independently of the UI

  Scenario Outline: Fetch a post by id
    When I GET "/posts/<id>"
    Then the response status is 200
    And the post id is <id>
    And the post has a non-empty title and body

    Examples:
      | id |
      | 1  |
      | 2  |
      | 3  |

  Scenario: Fetch the full posts collection
    When I GET "/posts"
    Then the response status is 200
    And the response contains 100 items

  Scenario: Create a post
    When I POST a new post to "/posts"
    Then the response status is 201
    And the created post echoes the payload and has a numeric id
