// Tip: configure baseURL in playwright.config for stability: { use: { baseURL: 'https://academybugs.com' } }
import {test, expect} from '@playwright/test';

test.use({trace: 'on-first-retry', video: 'retain-on-failure', screenshot: 'only-on-failure'});
import {App} from '../src/pages/index.js';
import {TestDataBuilder} from '../builders/TestDataBuilder.js';

test.describe.configure({mode: 'serial'});

test.describe('Academy Bugs tests', () => {
  test('БАГ #4: Ошибка в orange', async ({page}) => {
    let app = new App(page);

    await app.main.open();
    await app.main.clickCard("3981370");
    await app.suit.chooseColor();
    await app.bugModal.chooseType("Content");
    await app.bugModal.chooseResult("The color variant spellings");
    await app.bugModal.clickSubmit();
    await app.bugModal.clickViewReport();

    return test.step('Появление модалки "Awesome! You found a bug."', async () => {
      await expect(page.getByRole('radio', {name: 'Content'})).toBeVisible({timeout: 10000});
    });
  });

  test('БАГ #5: Неправильный расчет общей суммы в корзине', async ({page}) => {
    let app = new App(page);

    await app.main.open();
    await app.main.addProductToCart();
    await app.main.goToCheckout();
    await app.cart.goToProductPrice();
    await app.cart.chooseCorrectResult();
    await app.cart.goToIssueReport();
    await expect(page.getByRole('button', {name: 'Close'})).toBeVisible();
    await page.getByRole('button', {name: 'Close'}).click();
    await page.getByRole('button', {name: 'Close'}).click();
  });

  test('БАГ #1: Twitter share button не работает', async ({page}) => {
    await page.goto('https://academybugs.com/find-bugs/');
    await page.locator('#ec_product_image_effect_4481370').getByRole('link').click();

    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('link', {name: 'X', exact: true}).click();
    const page1 = await page1Promise;

    await page.getByRole('radio', {name: 'Functional'}).check();
    await page.getByRole('radio', {name: 'The twitter share button'}).check();
    await page.getByRole('button', {name: 'Submit'}).click();
    await page.getByRole('button', {name: 'View Issue Report'}).click();

    await expect(page.getByRole('button', {name: 'Close'})).toBeVisible();

    await page.getByRole('button', {name: 'Close'}).click();
    await page.getByRole('button', {name: 'Close'}).click();
  });

  test('БАГ #2: Страница зависает при отправке комментария', async ({page}) => {
    const commentData = TestDataBuilder.createCommentData();

    await page.goto('https://academybugs.com/find-bugs/');
    await page.locator('#ec_product_image_effect_4481370').getByRole('link').click();

    await page.getByRole('textbox', {name: 'Name*'}).fill(commentData.fullName);
    await page.getByRole('textbox', {name: 'Email*'}).fill(commentData.email);
    await page.getByRole('textbox', {name: 'Comment'}).fill(commentData.comment);
    await page.getByRole('button', {name: 'Post Comment'}).click();

    await page.locator('div').filter({hasText: 'You found a crash bug,'}).click();
    await page.getByRole('radio', {name: 'Crash', exact: true}).check();
    await page.getByRole('radio', {name: 'The comment is posted under'}).check();
    await page.getByRole('button', {name: 'Submit'}).click();
    await page.getByRole('button', {name: 'View Issue Report'}).click();

    await expect(page.getByRole('button', {name: 'Close'})).toBeVisible();

    await page.getByRole('button', {name: 'Close'}).click();
    await page.getByRole('button', {name: 'Close'}).click();
  });

  test('БАГ #3: Изображение товара отображается неполностью', async ({page}) => {
    await page.goto('https://academybugs.com/find-bugs/');
    await page.locator('#ec_product_image_effect_4281370').getByRole('link').click();

    await page.getByRole('radio', {name: 'Visual'}).check();
    await page.getByRole('radio', {name: 'The product image fills the'}).check();
    await page.getByRole('button', {name: 'Submit'}).click();
    await page.getByRole('button', {name: 'View Issue Report'}).click();

    await expect(page.getByRole('button', {name: 'Close'})).toBeVisible();

    await page.getByRole('button', {name: 'Close'}).click();
    await page.getByRole('button', {name: 'Close'}).click();
  });

});
