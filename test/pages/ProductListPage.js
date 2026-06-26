const BasePage = require('./BasePage');
const { PRODUCT_LIST, COMMON } = require('../constants/selectors');

/**
 * 상품 목록 화면 Page Object.
 */
class ProductListPage extends BasePage {
  /** 상품 목록 컨테이너가 로드될 때까지 대기 */
  async waitForLoad() {
    await this.waitForDisplayed(PRODUCT_LIST.CONTAINER);
  }

  /** 화면에 상품 목록이 표시되는지 */
  async isDisplayedOnScreen() {
    return this.isDisplayed(PRODUCT_LIST.CONTAINER);
  }

  /** 표시된 상품 개수 */
  async getProductCount() {
    const products = await this.getAll(PRODUCT_LIST.PRODUCT_IMAGE);
    return products.length;
  }

  /** index번째 상품을 클릭해 상세로 진입 */
  async openProduct(index = 0) {
    const products = await this.getAll(PRODUCT_LIST.PRODUCT_IMAGE);
    await products[index].click();
  }

  /** 첫 번째 상품의 제목 (정렬 검증용) */
  async getFirstProductTitle() {
    const titles = await this.getAll(PRODUCT_LIST.PRODUCT_TITLE);
    return titles[0].getText();
  }

  /** 가격 오름차순 정렬 */
  async sortByPriceAsc() {
    await this.click(PRODUCT_LIST.SORT_BTN);
    await this.click(PRODUCT_LIST.SORT_PRICE_ASC);
  }

  /** 가격 내림차순 정렬 */
  async sortByPriceDesc() {
    await this.click(PRODUCT_LIST.SORT_BTN);
    await this.click(PRODUCT_LIST.SORT_PRICE_DESC);
  }

  async isSortButtonDisplayed() {
    return this.isDisplayed(PRODUCT_LIST.SORT_BTN);
  }

  /** 장바구니 아이콘으로 이동 */
  async goToCart() {
    await this.click(COMMON.CART_ICON);
  }

  /** 장바구니 아이콘(배지)이 표시되는지 */
  async isCartIconDisplayed() {
    return this.isDisplayed(COMMON.CART_ICON);
  }
}

module.exports = new ProductListPage();
