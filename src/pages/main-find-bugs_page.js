export class MainFindBugsPage {
  constructor(page) {
    this.page = page;
    this.popupPage = page.locator('.swal2-popup, .bug-report-modal, [class*="report"]').first();
  }

  async open() {
    await this.page.goto('/find-bugs/');
    await this.page.waitForLoadState('networkidle');
  }

  async clickCard(productId) {
    await this.page.locator(`#ec_product_image_${productId}`)
      .getByRole('link', { name: 'Select Options' })
      .first()
      .click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickTwitterProduct() {
    await this.page.locator('#ec_product_image_effect_4481370').getByRole('link').click();
    await this.page.waitForLoadState('networkidle');
  }

  async goToAddProductToCart() {
    await this.page.locator('#ec_add_to_cart_5').click();
    await this.page.waitForTimeout(2000);  
    
    await this.page.locator('#ec_add_to_cart_4').click();
    await this.page.waitForTimeout(2000);  
    
    await this.page.locator('#ec_add_to_cart_27').click();
    await this.page.waitForTimeout(2000); 
  }

  async goToCheckout() {
    await this.page.waitForTimeout(3000);
    await this.page.getByRole('link').filter({ hasText: 'Items' }).first().click();
  }
}