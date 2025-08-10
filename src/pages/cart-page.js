export class CartPage {
  constructor(page) {
    this.page = page;
    this.productPrice = page.getByText('$114.13');
    this.typeBugCheck = page.getByLabel('Functional', { exact: true });
    this.correctResultCheck = page.getByLabel('The grand total is equal to');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.viewReportButton = page.getByRole('button', { name: 'View Issue Report' });
  }

  async goToProductPrice() {
    await this.productPrice.click();
  }

  async chooseCorrectResult() {
    await this.typeBugCheck.check();
    await this.correctResultCheck.check();
    await this.submitButton.click();
  }

  async goToIssueReport() {
    await this.viewReportButton.click();
  }
}