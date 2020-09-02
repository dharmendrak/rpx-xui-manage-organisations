;

const AppActions = require('../helpers/applicationActions');
const PallyActions = require('../helpers/pallyActions');

const assert = require('assert');
const { pa11ytest, getResults } = require('../helpers/pa11yUtil');
const html = require('pa11y-reporter-html');

const { conf } = require('../config/config');

const MockApp = require('../../nodeMock/app');

describe('Pa11y tests', function () {
    beforeEach(function () {
        MockApp.init()
    });
    afterEach(async function (done) {
        await MockApp.stopServer();
        done();
    });


    it('Unassigned Cases', async function () {
        await MockApp.startServer();
        const actions = [];
        actions.push(...PallyActions.navigateTourl(conf.baseUrl + 'unassigned-cases'));
        actions.push(...PallyActions.waitForPageWithCssLocator('app-unassigned-cases-component'));
        await pa11ytest(this, actions);
    });


    it('Unassigned Cases Share a case', async function () {
        await MockApp.startServer();
        const actions = [];
        actions.push(...PallyActions.navigateTourl(conf.baseUrl + 'unassigned-cases/case-share'));
        actions.push(...PallyActions.waitForPageWithCssLocator('xuilib-share-case'));
        await pa11ytest(this, actions);
    });

    it('Unassigned Cases Share a case Error page', async function () {
        MockApp.onGet('/api/organisation/users', (req,res) => { res.status(500).send({error:'test error'})});
        await MockApp.startServer();
        const actions = [];
        actions.push(...PallyActions.navigateTourl(conf.baseUrl + 'unassigned-cases/case-share'));
        actions.push(...PallyActions.waitForPageWithCssLocator('app-service-down h1'));
        await pa11ytest(this, actions);
    });

    it('Share Case Confirm Page', async function () {
        await MockApp.startServer();

        const actions = [];
        actions.push(...PallyActions.navigateTourl(conf.baseUrl + 'unassigned-cases/case-share'));
        actions.push(...PallyActions.waitForPageWithCssLocator('app-exui-case-share'));
        actions.push(...PallyActions.clickElement('#accordion-with-summary-sections .govuk-accordion__open-all'));

        actions.push(...PallyActions.clickElement('#accordion-with-summary-sections xuilib-selected-case  .govuk-accordion__section-content a'));
        actions.push(...PallyActions.clickElement('#share-case-nav button'));
        actions.push(...PallyActions.waitForPageWithCssLocator('app-exui-case-share-confirm #summarySections'));

        const result = await pa11ytest(this, actions);
    });

    it('Share Case Submission Success page', async function () {
        await MockApp.startServer();

        const actions = [];
        actions.push(...PallyActions.navigateTourl(conf.baseUrl + 'unassigned-cases/case-share'));
        actions.push(...PallyActions.waitForPageWithCssLocator('app-exui-case-share'));
        actions.push(...PallyActions.clickElement('#accordion-with-summary-sections .govuk-accordion__open-all'));

        actions.push(...PallyActions.clickElement('#accordion-with-summary-sections xuilib-selected-case  .govuk-accordion__section-content a'));
        actions.push(...PallyActions.clickElement('#share-case-nav button'));
        actions.push(...PallyActions.waitForPageWithCssLocator('app-exui-case-share-confirm #summarySections'));
        actions.push(...PallyActions.clickElement('xuilib-share-case-confirm #share-case-nav button'));
        actions.push(...PallyActions.waitForPageWithCssLocator('.govuk-panel--confirmation'));
        const result = await pa11ytest(this, actions);
    });

    it('Share Case Submission Partial Success page', async function () {
        MockApp.onPost('/api/caseshare/case-assignments', (req,res) => {
            res.send(req.body);
        });
        await MockApp.startServer();

        const actions = [];
        actions.push(...PallyActions.navigateTourl(conf.baseUrl + 'unassigned-cases/case-share'));
        actions.push(...PallyActions.waitForPageWithCssLocator('app-exui-case-share'));
        actions.push(...PallyActions.clickElement('#accordion-with-summary-sections .govuk-accordion__open-all'));

        actions.push(...PallyActions.clickElement('#accordion-with-summary-sections xuilib-selected-case  .govuk-accordion__section-content a'));
        actions.push(...PallyActions.clickElement('#share-case-nav button'));
        actions.push(...PallyActions.waitForPageWithCssLocator('app-exui-case-share-confirm #summarySections'));
        actions.push(...PallyActions.clickElement('xuilib-share-case-confirm #share-case-nav button'));
        actions.push(...PallyActions.waitForPageWithCssLocator('.govuk-panel--confirmation'));
        const result = await pa11ytest(this, actions);
    });

    it('Share Case Submission Server error page', async function () {
        MockApp.onPost('/api/caseshare/case-assignments', (req, res) => {
            res.status(500).send({});
        });
        await MockApp.startServer();

        const actions = [];
        actions.push(...PallyActions.navigateTourl(conf.baseUrl + 'unassigned-cases/case-share'));
        actions.push(...PallyActions.waitForPageWithCssLocator('app-exui-case-share'));
        actions.push(...PallyActions.clickElement('#accordion-with-summary-sections .govuk-accordion__open-all'));

        actions.push(...PallyActions.clickElement('#accordion-with-summary-sections xuilib-selected-case  .govuk-accordion__section-content a'));
        actions.push(...PallyActions.clickElement('#share-case-nav button'));
        actions.push(...PallyActions.waitForPageWithCssLocator('app-exui-case-share-confirm #summarySections'));
        actions.push(...PallyActions.clickElement('xuilib-share-case-confirm #share-case-nav button'));
        actions.push(...PallyActions.waitForPageWithCssLocator('app-service-down h1'));
        const result = await pa11ytest(this, actions);
    });
});


