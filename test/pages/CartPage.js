const BasePage = require('./BasePage');
const { CART } = require('../constants/selectors');


// 장바구니 화면

class CartPage extends BasePage {
  async getProductTitle() {
    return this.getText(CART.PRODUCT_TITLE);
  }

  async getProductPrice() {
    return this.getText(CART.PRODUCT_PRICE);
  }

  async getQuantity() {
    return this.getText(CART.QUANTITY);
  }
  // 가격을 숫자로 반환 ("$ 29.99" -> 29.99)
  async getProductPriceNumber() {
    const text = await this.getText(CART.PRODUCT_PRICE);
    return parseFloat(text.replace(/[^0-9.]/g, ''));
  }

  // 수량을 숫자로 반환
  async getQuantityNumber() {
    const text = await this.getText(CART.QUANTITY);
    return parseInt(text.replace(/[^0-9]/g, ''), 10);
  }

  // 장바구니에 담긴 상품 줄 수
  async getItemCount() {
    const titles = await this.getAll(CART.PRODUCT_TITLE);
    return titles.length;
  }

  // 상품 삭제
  async removeItem() {
    await this.click(CART.REMOVE_BTN);
  }

  // 장바구니의 모든 상품 삭제
  async removeAllItems() {
    const removeButtons = await this.getAll(CART.REMOVE_BTN);
    for (const button of removeButtons) {
      await button.click();
    }
  }

  // 결제 단계로 진입
  async proceedToCheckout() {
    await this.click(CART.CHECKOUT_BTN);
  }

  async isProductDisplayed() {
    return this.isDisplayed(CART.PRODUCT_TITLE);
  }

  async isCheckoutButtonDisplayed() {
    return this.isDisplayed(CART.CHECKOUT_BTN);
  }

  // 장바구니 화면
  async isCartScreen() {
    const hasItems = await this.isDisplayed(CART.PRODUCT_TITLE, 1500);
    const isEmpty = await this.isDisplayed(CART.EMPTY_CART, 1500);
    return hasItems || isEmpty;
  }
}

module.exports = new CartPage();
