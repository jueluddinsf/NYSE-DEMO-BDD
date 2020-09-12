Feature: Any user should be able see Market data component
    - Market Data component must contain the following tabs in order
    - “NYSE” tab is selected the table view must display the following columns in order
    - “NYSE” table must display data in volume order (descending)
    - Volume column data must be numeric and contain thousand separator.
    - Last price column data must be numeric with precision up to 3 decimal places.
    - Percentage change column data must display value change with precision up to 3 decimal places and percentage precision with 3 decimal places.
    - Percentage change column data must display the value in green when there is positive change and red when there is negative change.
    - Each row must support click through action to the quote page.
    - All text such as Company Name and column headers should be displayed in upper case.
    - Link “View Our Listings Directory” must link to the Listing Directory located at
    - https://www.nyse.com/listings_directory/stock.

    Background: navigate to page
        Given I navigate to NYSE home page
        And The page title should be "The New York Stock Exchange | NYSE"
        Then I click on ".ds-tabs"

    Scenario: 01 - Verify market data tabs order and columns order for NYSE tab
        Then I verify market data tabs are in following order "INDICES,NYSE,NYSE American,ETFs"
        And I click on NYSE tab
        Then I verify the column order to be "Description,Volume,Last,Change (%)"

    Scenario: 02 - Verify NYSE volume column contains only numeric with thousand separator and order descending
        Given I click on NYSE tab
        And I verify volume data is in descending order
        Then I verify volume data numeric and contain thousand separator

    Scenario: 03 - Verify last price data is numeric decimal and changes color when there is negative change
        Given I click on NYSE tab
        And I verify Last price data numeric and has 3 decimal places
        And I verify percentage and value change data has up to 3 decimal
        Then I verify red for minus and green for plus displays

    Scenario: 03 - Verify each row is clickable
        Given I click on NYSE tab
        Then I click on each row and verify quote page displays

    Scenario: 04 - Verify Company Name and column headers to be displayed in upper case
        Given I click on NYSE tab
        And I should see "INDICES" within "#stats"
        And I should see "NYSE" within "#stats"
        And I should see "NYSE American" within "#stats"
        And I should see "ETFs" within "#stats"
        And I should see "Description" within ".ds-headerRow"
        And I should see "Volume" within ".ds-headerRow"
        And I should see "Last" within ".ds-headerRow"
        And I should see "Change (%)" within ".ds-headerRow"
        And I verify all company name is uppercase
        Then I verify View Our Listings Directory link

        
        