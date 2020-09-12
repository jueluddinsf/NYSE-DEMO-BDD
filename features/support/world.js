const {setWorldConstructor, setDefaultTimeout} = require('cucumber');
const {expect} = require('chai');
const puppeteer = require('puppeteer');

const homePage = require('../../page-objects/home.po');

const launchConfig = {
    defaultViewport: null,
    dumpio: true,
    headless: false,
    slowMo: 100,
    args: ['--disable-dev-shm-usage', '--no-sandbox'],
};

const elementIsVisible = {visible: true};

setDefaultTimeout(60 * 1000);

function verifyDescOrder(filteredVal) {
    for (let i = 0; i < filteredVal.length; i++) {
        if (filteredVal[i] < filteredVal[i + 1]) {
            return false;
        }
    }
    return true;
}

function verifyThousandSeparatorExists(data) {
    const arr = data.split(",");
    for (let i = 1; i < arr.length; i++) {
        if (arr[i].length < 3 || arr[i].length > 3) {
            return false
        }
    }
    //console.log(arr)
    return true;
}

function verifyNumHasUpTo3Decimal(data) {
    const arr = data.split(".");
    for (let i = 1; i < arr.length; i++) {
        if (arr[i].length > 3) {
            return false
        }
    }
    //console.log(arr)
    return true;
}

function isUpperCase(str) {
    return str === str.toUpperCase();
}

class MarketData {

    //
    // Hooks
    //

    async openApplication() {
        this.browser = await puppeteer.launch(launchConfig);
        this.page = await this.browser.newPage();
    };

    async closeApplication() {
        await this.browser.close();
    };

    //
    // Home Page
    //

    async navigateToHomePage() {
        const navPromise = this.page.waitForNavigation();
        await this.page.goto(homePage.url);
        await navPromise;
    };

    async verifyOnHomePage(expected_title) {
        const title = await this.page.title();
        const expectedTitle = expected_title;
        expect(title).to.equal(expectedTitle)
        console.log("expected: " + expectedTitle + " and found " + title)
    };

    //
    // Selection Page
    //

    async selectAnimalByName(animalName) {
        const mapAnimalToValue = {
            'George the Turtle': '1',
            'Simba the Lion': '2',
            'Nemo the Fish': '3'
        };

        await this.page.waitFor(selectionPage.animalSelect, elementIsVisible);
        await this.page.select(selectionPage.animalSelect, mapAnimalToValue[animalName]);
        const navPromise = this.page.waitForNavigation();
        await this.page.waitFor(selectionPage.continueButton, elementIsVisible);
        await this.page.click(selectionPage.continueButton);
        await navPromise;
    };

    //
    // Confirmation Page
    //

    async verifyConfirmationText() {
        await this.page.waitFor(confirmationPage.paragraphText, elementIsVisible);
        const text = await this.page
            .evaluate(x => document.querySelector(x).innerText, confirmationPage.paragraphText);
        expect(text)
            .to.equal('Thank you for your selection. Your animal adoption papers will be sent to you shortly with a lovely card from your selected animal.')
    };

    async navigateBackHome() {
        await this.page.waitFor(confirmationPage.backToHomeButton, elementIsVisible);
        const navPromise = this.page.waitForNavigation();
        await this.page.click(confirmationPage.backToHomeButton);
        await navPromise;
    };

    async clickOnElement(selector) {
        await this.page.waitForSelector(selector);
        await this.page.click(selector);
    };

    async TabsOrderCheck(expectedTabOrder) {
        const expectOrder = expectedTabOrder.split(",");
        await this.page.waitForSelector(homePage.marketDataTabs);
        const tabTexts = await this.page.$$eval(homePage.marketDataTabs,
            elements => elements.map(item => item.textContent));
        expect(tabTexts).to.eql(expectOrder);
        await console.log(tabTexts)
    };

    async clickNYSEtab() {
        await this.page.waitForSelector(homePage.nyseTab);
        await this.page.click(homePage.nyseTab);
    };

    async ColOrderCheck(expectedColOrder) {
        const expectColOrder = expectedColOrder.split(",");
        await this.page.waitForSelector(homePage.allColumns);
        const ColTexts = await this.page.$$eval(homePage.allColumns,
            elements => elements.map(item => item.textContent.trim()));
        expect(ColTexts).to.eql(expectColOrder);
        await console.log(ColTexts)
    };


    async volumeDataDescCheck() {
        await this.page.waitForSelector(homePage.volumeData);
        const ColTexts = await this.page.$$eval(homePage.volumeData,
            elements => elements.map(item => parseInt(item.textContent.replace(/\,/g, ''), 10)));
        const filteredVal = ColTexts.filter(function (el) {
            return el != null;
        });
        // descending order check
        console.log(verifyDescOrder(filteredVal));
        expect(verifyDescOrder(filteredVal)).to.true;
    };


    async volumeDataNumericWithSeparator() {
        await this.page.waitForSelector(homePage.volumeData);
        const ColTexts = await this.page.$$eval(homePage.volumeData,
            elements => elements.map(item => item.textContent.trim()));
        const filteredVal = ColTexts.filter(function (el) {
            return el != 'Volume';
        });
        // verify Thousand Separator Exists 
        //console.log(filteredVal);
        for (let i = 0; i < filteredVal.length; i++) {
            expect(verifyThousandSeparatorExists(filteredVal[i])).to.eq(true);
            const numberStr = filteredVal[i].replace(/\,/g, '');
            // check if none numeric value present
            const regExp = /[a-zA-Z]/g;
            expect(regExp.test(numberStr)).to.eq(false);
        }
    };


    async LastPriceDataNumAndSeparatorCheck() {
        await this.page.waitForSelector(homePage.lastData);
        const lastData = await this.page.$$eval(homePage.lastData,
            elements => elements.map(item => item.textContent.trim()));
        const filteredLastData = lastData.filter(function (el) {
            return el != 'Last';
        });
        console.log(filteredLastData);
        for (let i = 0; i < filteredLastData.length; i++) {
            expect(verifyNumHasUpTo3Decimal(filteredLastData[i])).to.eq(true);
            const numberStr = filteredLastData[i].replace(/\,/g, '');
            // check if none numeric value present
            const regExp = /[a-zA-Z]/g;
            expect(regExp.test(numberStr)).to.eq(false);
        }

    }


    async valueAndPercentageDecimalCheck() {
        await this.page.waitForSelector(homePage.valueAndPercentageData);
        const lastData = await this.page.$$eval(homePage.valueAndPercentageData,
            elements => elements.map(item => item.textContent.trim()));
        const filteredValPerData = lastData.filter(function (el) {
            return el != 'Change (%)';
        });
        console.log(filteredValPerData);
        for (let i = 0; i < filteredValPerData.length; i++) {
            const SplitData = filteredValPerData[i].split(" ");
            const valueData = SplitData[0].replace(/[+-]/g, '').trim();
            console.log(valueData.toString());
            const percentageData = SplitData[1].replace(/[(%)+-]/g, '').trim();
            console.log(percentageData.toString());

            expect(verifyNumHasUpTo3Decimal(valueData)).to.eq(true);
            expect(verifyNumHasUpTo3Decimal(percentageData)).to.eq(true);
        }

    }


    async checkGreenDataForPlus() {
        await this.page.waitForSelector(homePage.greenData);
        const greenData = await this.page.$$eval(homePage.greenData,
            elements => elements.map(item => item.textContent.trim()));
        console.log(greenData);

        for (let i = 0; i < greenData.length; i++) {
            console.log(greenData[i]);
            console.log(greenData[i].includes("+"));
            expect(greenData[i].includes("+")).to.eq(true);
            expect(greenData[i].includes("-")).to.eq(false);
        }

    }


    async checkRedDataForPlus() {
        await this.page.waitForSelector(homePage.redData);
        const redData = await this.page.$$eval(homePage.redData,
            elements => elements.map(item => item.textContent.trim()));
        console.log(redData);

        for (let i = 0; i < redData.length; i++) {
            console.log(redData[i]);
            expect(redData[i].includes("-")).to.eq(true);
            expect(redData[i].includes("+")).to.eq(false);
        }

    }

    async clickEachRow() {
        await this.page.waitForSelector(homePage.allRowsCompanyName);
        const companyNames = await this.page.$$eval(homePage.allRowsCompanyName,
            elements => elements.map(item => item.textContent.trim()));
        console.log(companyNames);
        let counter = 2;
        for (let i = 0; i < companyNames.length; i++) {
            const rowSelector = `#stats > div > div > div:nth-child(2) > div > div > div > div:nth-child(${counter}`
            await this.page.waitForSelector(rowSelector);
            await this.page.click(rowSelector);
            await this.page.waitForSelector('.d-detailquote-head');
            await this.page.goBack();
            await this.page.waitForSelector(homePage.allRowsCompanyName);
            counter++
        }


    }

    async verifyText(expectedText, selector) {
        const element = await this.page.$(selector);
        const actualText = await this.page.evaluate(element => element.textContent, element);
        expect(actualText).to.include(expectedText)
    };

    async checkCompanyNameUpCase() {
        await this.page.waitForSelector(homePage.allRowsCompanyName);
        const companyNames = await this.page.$$eval(homePage.allRowsCompanyName,
            elements => elements.map(item => item.textContent.trim()));
        console.log(companyNames);
        for (let i = 0; i < companyNames.length; i++) {
            expect(isUpperCase(companyNames[i])).to.eq(true);
        }
    }


    async checkListingsLink() {
        const hrefs = await this.page.$$eval('div > div > p:nth-child(4) > a', as => as.map(a => a.href));
        expect(hrefs[0]).to.eq('https://www.nyse.com/listings_directory/stock')
    }
        

};


setWorldConstructor(MarketData);