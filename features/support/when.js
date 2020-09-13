const {When} = require('cucumber');

When(/^I click on "([^"]*)"$/, async function (selector) {
    await this.clickOnElement(selector)
});

When(/^I click on "([^"]*)" tab$/, async function (tab) {
    await this.clickTab(tab);
});