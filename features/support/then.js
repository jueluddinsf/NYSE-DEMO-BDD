const {Then} = require('cucumber');

Then('I should be on home page', async function () {
    await this.verifyOnHomePage();
});

Then(/^The page title should be "([^"]*)"$/, async function (title) {
    await this.verifyOnHomePage(title);
});

Then(/^I verify market data tabs are in following order "([^"]*)"$/, async function (tabsList) {
    await this.TabsOrderCheck(tabsList);
});

Then(/^I verify the column order to be "([^"]*)"$/, async function (expectedColOrder) {
    await this.ColOrderCheck(expectedColOrder);
});

Then(/^I verify "([^"]*)" data is in descending order$/, async function (dataSelector) {
    await this.DataDescCheck(dataSelector);
});
Then(/^I verify "([^"]*)" data numeric and contain thousand separator$/, async function (dataSelector) {
    await this.dataNumericWithSeparator(dataSelector);
});

Then(/^I verify "([^"]*)" data numeric and has 3 decimal places$/, async function (dataSelector) {
    await this.dataNumAndSeparatorCheck(dataSelector);
});

Then(/^I verify "([^"]*)" data has up to 3 decimal$/, async function (dataSelector) {
    await this.decimalCheck(dataSelector);
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

Then(/^I verify words are uppercase for "([^"]*)"$/, async function (selectors) {
    await this.checkWordsUpCase(selectors)
});

Then(/^I verify "([^"]*)" link location is "([^"]*)"$/, async function (link, location) {
    await this.checkListingsLink(link, location);
});