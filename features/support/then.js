const {Then} = require('cucumber');


Then('I should be on home page', async function () {
    await this.verifyOnHomePage();
});

Then(/^I click on "([^"]*)"$/, async function (selector) {
    await this.clickOnElement(selector)
});

Then(/^I verify market data tabs are in following order "([^"]*)"$/, async function (tabsList) {
    await this.TabsOrderCheck(tabsList);
});

Then(/^I click on NYSE tab$/, async function () {
    await this.clickNYSEtab();
});

Then(/^I verify the column order to be "([^"]*)"$/, async function (expectedColOrder) {
    await this.ColOrderCheck(expectedColOrder);
});

Then(/^I verify volume data is in descending order$/, async function () {
    await this.volumeDataDescCheck();
});
Then(/^I verify volume data numeric and contain thousand separator$/, async function () {
    await this.volumeDataNumericWithSeparator();
});

Then(/^I verify Last price data numeric and has 3 decimal places$/, async function () {
    await this.LastPriceDataNumAndSeparatorCheck();
});

Then(/^I verify percentage and value change data has up to 3 decimal$/, async function () {
    await this.valueAndPercentageDecimalCheck();
});

Then(/^I verify red for minus and green for plus displays$/, async function () {
    await this.checkRedDataForPlus();
    await this.checkGreenDataForPlus();
});

Then(/^I click on each row and verify quote page displays$/, async function () {
    await this.clickEachRow();
});

Then(/^I should see "([^"]*)" within "([^"]*)"$/, async function (expectedText, selector) {
    await this.verifyText(expectedText, selector);
});

Then(/^I verify all company name is uppercase$/, async function () {
    await this.checkCompanyNameUpCase();
});

Then(/^I verify View Our Listings Directory link$/, async function () {
    await this.checkListingsLink();
});