Feature: Any user should be able see Market data component
    - Market Data component must contain the following tabs in order
    - “NYSE” tab is selected the table view must display the following columns in order
    - “NYSE” table must display data in volume order (descending)
    - Volume column data must be numeric and contain thousand separator.
    - Last price column data must be numeric with precision up to 3 decimal places.
    - Percentage change column data must display value change with precision up to 3
    decimal places and percentage precision with 3 decimal places.
    - Percentage change column data must display the value in green when there is positive
    change and red when there is negative change.
    - Each row must support click through action to the quote page.
    - All text such as Company Name and column headers should be displayed in upper case.
    - Link “View Our Listings Directory” must link to the Listing Directory located at
    - https://www.nyse.com/listings_directory/stock.

    Background: navigate to page
        Given I navigate to NYSE home page
        And The page title should be "The New York Stock Exchange | NYSE"
        Then I click on "homePage.tabs"

    Scenario: 01 - Verify market data tabs order and columns order for NYSE tab
        Then I verify market data tabs are in following order "INDICES,NYSE,NYSE American,ETFs"
        And I click on "homePage.nyseTab" tab
        Then I verify the column order to be "Description,Volume,Last,Change (%)"

    Scenario: 02 - Verify NYSE volume column contains only numeric with thousand separator and order descending
        And I click on "homePage.nyseTab" tab
        And I verify "homePage.volumeData" data is in descending order
        Then I verify "homePage.volumeData" data numeric and contain thousand separator

    Scenario: 03 - Verify last price data is numeric decimal and changes color when there is negative change
        And I click on "homePage.nyseTab" tab
        And I verify "homePage.lastPrice" data numeric and has 3 decimal places
        And I verify "homePage.valueAndPercentageData" data has up to 3 decimal
        Then I verify red for minus and green for plus displays
     
     #test fails as clicking on Market data table 3rd row displays an error
    Scenario: 03 - Verify each row is clickable
        And I click on "homePage.nyseTab" tab
        Then I click on each row and verify quote page displays

    # this test will also fail on the weekend and after hours    
    Scenario: 04 - Verify Company Name and column headers to be displayed in upper case
        And I click on "homePage.nyseTab" tab
        And I should see "INDICES" within "homePage.marketData"
        And I should see "NYSE" within "homePage.marketData"
        And I should see "NYSE American" within "homePage.marketData"
        And I should see "ETFs" within "homePage.marketData"
        And I should see "Description" within "homePage.headerRow"
        And I should see "Volume" within "homePage.headerRow"
        And I should see "Last" within "homePage.headerRow"
        And I should see "Change (%)" within "homePage.headerRow"
        And I verify words are uppercase for "homePage.allRowsCompanyName"
        Then I verify "homePage.listingsDirectoryLink" link location is "/listings_directory/stock"

        
        