const {Given} = require('cucumber');

Given('I navigate to NYSE home page', async function () {
    await this.navigateToHomePage();
});
