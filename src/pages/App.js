import { MainFindBugsPage } from './main-find-bugs_page.js';
import { StoreProfessionalSuitPage } from './store_professional-suit_page.js';
import { CartPage } from './cart-page.js';


export class App {
  constructor(page) {
    this.page = page;
    
    this._mainPage = null;
    this._suitPage = null;
    this._bugModal = null;
    this._cartPage = null;
  }

  /**
   * Главная страница main-find-bugs_page.js
   */
  get main() {
    if (!this._mainPage) {
      this._mainPage = new MainFindBugsPage(this.page);
    }
    return this._mainPage;
  }

  /**
   * Страница костюма store_professional-suit_page.js
   */
  get suit() {
    if (!this._suitPage) {
      this._suitPage = new StoreProfessionalSuitPage(this.page);
    }
    return this._suitPage;
  }

  /**
   * Модалка с багами
   */
  get bugModal() {
    if (!this._bugModal) {
      this._bugModal = new BugModal(this.page);
    }
    return this._bugModal;
  }

    get cart() {
    if (!this._cartPage) {
      this._cartPage = new CartPage(this.page);
    }
    return this._cartPage;
  }
}

/**
 * BugModal - модалка классификации бага
 */
export class BugModal {
  constructor(page) {
    this.page = page;
    
    // Селектор для заголовка модалки
    this.title = page.locator('text="Awesome! You found a bug.", text="You found a bug", [class*="bug-title"]').first();
    
    // Селекторы для классификации
    this.contentRadio = page.getByRole('radio', { name: 'Content' });
    this.functionalRadio = page.getByRole('radio', { name: 'Functional' });
    this.visualRadio = page.getByRole('radio', { name: 'Visual' });
    this.crashRadio = page.getByRole('radio', { name: 'Crash' });
    
    // Селекторы для результатов
    this.colorSpellingResult = page.getByRole('radio', { name: 'The color variant spellings' });
    this.englishTextResult = page.getByRole('radio', { name: 'The text should be in English' });
    
    // Кнопки
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.viewReportButton = page.getByRole('button', { name: 'View Issue Report' });
    this.closeButton = page.getByRole('button', { name: 'Close' });
  }

  /**
   * Выбрать тип бага
   */
  async chooseType(bugType) {
    const typeMap = {
      'Content': this.contentRadio,
      'Functional': this.functionalRadio,
      'Visual': this.visualRadio,
      'Crash': this.crashRadio
    };
    
    await typeMap[bugType]?.click();
  }

  /**
   * Выбрать ожидаемый результат (точный селектор из codegen)
   */
  async chooseResult(resultText) {
    if (resultText.includes('color variant spellings')) {
      await this.page.getByRole('radio', { name: 'The color variant spellings should be written as \'Orange\' and \'Yellow\' instead of \'Orang\' and \'Yelow\' respectively' }).check();
    } else {
      // Для других случаев - ищем по частичному тексту
      await this.page.getByRole('radio').filter({ hasText: resultText }).first().click();
    }
  }

  /**
   * Нажать Submit
   */
  async clickSubmit() {
    await this.submitButton.click();
  }

  /**
   * Открыть отчет
   */
  async clickViewReport() {
    await this.viewReportButton.click();
  }

  /**
   * Проверить видимость модалки с правильным ожиданием
   */
  async isTitleVisible() {
    try {
      // Ждем появления модалки до 5 секунд (учитывая задержку в 3 сек)
      await this.page.getByRole('radio', { name: 'Content' }).waitFor({ timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

}