var EC = protractor.ExpectedConditions;

class BrowserWaits {



    constructor() {
        this.waitTime = 30000;
        this.pageErrors = $$(".error-summary");
    }

    async waitForElement(waitelement, customWait,message) {
        await browser.wait(EC.visibilityOf(waitelement), customWait ? customWait : this.waitTime, "Error : " + waitelement.locator().toString() + (message ? " => " + message : "_"));
    }

    async waitForElementNotVisible(element,customWait) {
        await browser.wait(EC.not(EC.presenceOf(element), customWait ? customWait : this.waitTime, "Error : " + element.locator().toString()));

    }

    async waitForPresenceOfElement(element) {
        await browser.wait(EC.presenceOf(element), this.waitTime, "Error : " + element.locator().toString());
    }

    async waitForElementClickable(element) {
        await browser.wait(EC.elementToBeClickable(element), this.waitTime, "Error : " + element.locator().toString());
    }

    async waitForCondition(condition) {
        const startTime = new Date();
        let conditionResult = await condition();

        let counter = 0;
        while (!conditionResult && counter < 10){
            browser.sleep(5000);
            counter++;
            conditionResult = await condition();
        }
        const endtime = new Date();

        console.log("Wait for condition : " + (endtime - startTime));
    }

    async waitForSelector(selector) {
        var selectorElement = $(selector);
        await browser.wait(EC.presenceOf($(selector)), this.waitTime, "Error find element with selector: " + selector);
    }

    async waitForstalenessOf(element,timeout) {
        await browser.wait(EC.stalenessOf(element), timeout ? timeout : this.waitTime);
    }

    async waitForPageNavigation(currentPageUrl) {
        var nextPage = "";
        let pageErrors = "";
        await browser.wait(async () => {
            nextPage = await browser.getCurrentUrl();

            for (let errorMsgCounter = 0; errorMsgCounter < this.pageErrors.length; errorMsgCounter++) {
                pageErrors = pageErrors + " | " + this.pageErrors[errorMsgCounter].getText();
            }

            return currentPageUrl !== nextPage;
        }, this.waitTime, "Navigation to next page taking too long " + this.waitTime + ". Current page " + currentPageUrl + ". Errors => " + pageErrors);
    }

    async retryForPageLoad(element, callback) {
        let retryCounter = 0;

        while (retryCounter < 3) {
            try {
                await this.waitForElement(element);
                retryCounter += 3;
            }
            catch (err) {
                retryCounter += 1;
                if (callback) {
                    callback(retryCounter + "");
                }
                console.log(element.locator().toString() + " .    Retry attempt for page load : " + retryCounter);

                await browser.refresh();

            }
        }
    }


    async retryWithAction(element, action) {
        let retryCounter = 0;

        while (retryCounter < 3) {
            try {
                await this.waitForElement(element,15000);
                retryCounter += 3;
            }
            catch (err) {
                retryCounter += 1;
                if (action) {
                    await action(retryCounter + "");
                }
                console.log(element.locator().toString() + " .    Retry attempt with user action(s) : " + retryCounter);
            }
        }
    }

}

module.exports = new BrowserWaits();
