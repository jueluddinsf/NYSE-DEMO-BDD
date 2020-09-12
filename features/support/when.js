const {When} = require('cucumber');

When('I navigate back to home', async function(){
    await this.navigateBackHome();
});