const {When} = require('cucumber');

When(/^I click on "([^"]*)"$/, async function (selector) {
    await this.clickOnElement(selector)
});

When(/^I click on NYSE tab$/, async function () {
    await this.clickNYSEtab();
});