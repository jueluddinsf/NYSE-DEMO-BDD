const {Given} = require('cucumber');

Given('I navigate to NYSE home page', async function () {
    await this.navigateToHomePage();
});

Given(/^The page title should be "([^"]*)"$/, async function (title) {
    await this.verifyOnHomePage(title);
});