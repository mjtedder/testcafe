import { Selector, ClientFunction } from 'testcafe';
import VueSelector from 'testcafe-vue-selectors';

// Vue Component Selectors
const rootVue = VueSelector();
const quickCriteria = VueSelector('quick-criteria');
const selectRangeCriteria = VueSelector('quick-criteria select-range-criteria');
const quickCriteriaItem = VueSelector('quick-criteria-item select');
const vueComponent = VueSelector('componentTag')

// DOM Selectors
const viewAllCriteriaButton = Selector('button.button--primary').withText('View all criteria');


const testEnvironment = 'https://wwwx3.steroyalbank.com/screener/sitf3/dist/rbc-n600/index.html#/stocks'

fixture `DIP-6463: Screeners - View All Criteria`
    .page(testEnvironment);

test('Scenario 1 - User can navigate to the page and the View All Criteria button is visible', async t => {
    const actual = Selector('button.button--primary').innerText;
    const expected = 'View all criteria';
    await t.expect(actual).eql(expected);
})

const getLocation = ClientFunction(() => window.location.href);

test('Scenario 2 - User can click the View All Criteria button and criteria drawer opens from the right side of the screen', async t => {
    const expected = Selector('span.icon');
    const actual = 'View all criteria';
    await t.click(viewAllCriteriaButton);

    await t.expect(expected.exists).ok();
})

test('Scenario 3 - User can click the X button and the criteria drawer closes', async t => {
    const expected = Selector('span.icon');
    const actual = 'View all criteria';
    await t.click(viewAllCriteriaButton);
    const xIcon = Selector('span.icon');
    await t.click(xIcon)
    await t.expect(getLocation()).notContains(xIcon);
});

test('Scenario 4 - On criteria drawer, results value is 0', async t => {
    await t.click(viewAllCriteriaButton);
    const resultsCounter = await Selector('div.criteria-drawer-container').find('p.results-number');
    let resultsText = await resultsCounter.innerText;
    const actual = '0';
    await t.expect(actual).eql(resultsText);
});

test('Scenario 5 - On criteria drawer, search bar is visible', async t => {
    await t.click(viewAllCriteriaButton);
    const searchBar = await Selector('div.criteria-drawer-container').find('input.search-bar');
    await t.expect(searchBar.exists).ok();
});

test('Scenario 6 - On criteria drawer, the 4 tabs are visible', async t => {
    await t.click(viewAllCriteriaButton);
    const searchDiv = await Selector('div.search-bar-group');
    const tabGroup = searchDiv.child(1);
    const performanceTab = tabGroup.child(1);
    const fundamentalTab = tabGroup.child(2);
    const researchTab = tabGroup.child(3);
    const clickedTab = await Selector('div.button-group').find('button.selected');
    await t.expect(clickedTab.innerText).eql('Most Popular');
    await t.click(performanceTab);
    await t.expect(clickedTab.innerText).eql('Performance');
    await t.click(fundamentalTab);
    await t.expect(clickedTab.innerText).eql('Fundamental');
    await t.click(researchTab);
    await t.expect(clickedTab.innerText).eql('Research');
})