export class MainFindBugsPage {
  constructor(page) {
    this.page = page;
    this.popupPage = page.locator('.swal2-popup, .bug-report-modal, [class*="report"]').first();
  }

  async open() {
    await this.page.goto('/find-bugs/');
    await this.page.waitForLoadState('load');
  }

  async clickCard(productId) {
    await this.page.locator(`#ec_product_image_${productId}`)
      .getByRole('link', {name: 'Select Options'})
      .first()
      .click();
    await this.page.waitForLoadState('load');
  }

  async clickTwitterProduct() {
    await this.page.locator('#ec_product_image_effect_4481370').getByRole('link').click();
    await this.page.waitForLoadState('load');
  }

  async addProductToCart() {
    await this.page.locator('#ec_add_to_cart_5').click();
    await this.page.waitForLoadState('load');
  }

  async goToCheckout() {
    await this.page.getByRole('link').filter({hasText: 'VIEW CART'}).first().click();
    await this.page.waitForLoadState('load');
  }
}
