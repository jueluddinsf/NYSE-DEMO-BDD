const {After, Before} = require('cucumber');

Before({timeout: 30 * 1000}, async function(testCase){
    await this.openApplication();
});

After(async function() {
    await this.closeApplication();
});