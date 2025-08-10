export class StoreProfessionalSuitPage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Выбрать цвет "Orang"
   */
  async chooseColor() {
    // Первый клик на картинку
    await this.page.getByRole('img', { name: 'Orang' }).click();
    // Второй клик на текст (который триггерит баг)
    await this.page.getByText('Orang').click();
  }

  /**
   * Альтернативный метод - прямой клик по Orange (из codegen)
   */
  async clickColorOrang() {
    await this.page.getByRole('img', { name: 'Orang' }).click();
    await this.page.getByText('Orang').click();
  }


/**
 * Кликнуть на Twitter кнопку (X)
 */
  async clickTwitterButton() {
  // Подготавливаем ожидание popup
  const popupPromise = this.page.waitForEvent('popup');
  
  // Кликаем на кнопку X (Twitter)
  await this.page.getByRole('link', { name: 'X', exact: true }).click();
  
  // Ждем popup
  const popup = await popupPromise;
  
  return popup;
}
}