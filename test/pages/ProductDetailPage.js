const BasePage = require('./BasePage');
const { PRODUCT_DETAIL } = require('../constants/selectors');

/**
 * 상품 상세 화면 Page Object.
 */
class ProductDetailPage extends BasePage {
  async getTitle() {
    return this.getText(PRODUCT_DETAIL.TITLE);
  }

  async getPrice() {
    return this.getText(PRODUCT_DETAIL.PRICE);
  }

  async getQuantity() {
    return this.getText(PRODUCT_DETAIL.QUANTITY);
  }

  async increaseQuantity() {
    await this.scrollToElement(PRODUCT_DETAIL.PLUS_BTN);
    await this.click(PRODUCT_DETAIL.PLUS_BTN);
  }

  async decreaseQuantity() {
    await this.scrollToElement(PRODUCT_DETAIL.MINUS_BTN);
    await this.click(PRODUCT_DETAIL.MINUS_BTN);
  }

  async addToCart() {
    await this.scrollToElement(PRODUCT_DETAIL.ADD_TO_CART_BTN);
    await this.click(PRODUCT_DETAIL.ADD_TO_CART_BTN);
  }

  async isTitleDisplayed() {
    return this.isDisplayed(PRODUCT_DETAIL.TITLE);
  }

  async waitForLoad() {
    await this.waitForDisplayed(PRODUCT_DETAIL.TITLE);
  }

  async isPriceDisplayed() {
    return this.isDisplayed(PRODUCT_DETAIL.PRICE);
  }
}

module.exports = new ProductDetailPage();