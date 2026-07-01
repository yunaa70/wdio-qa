const { expect } = require('@wdio/globals');
const { loginAsValidUser } = require('../helpers/flows');
const ProductListPage = require('../pages/ProductListPage');
const ProductDetailPage = require('../pages/ProductDetailPage');
const CartPage = require('../pages/CartPage');

// 07. 금액·수량 정합성
// 상세에서 본 가격/수량이 장바구니에 그대로 반영되는지, 수량을 늘렸을 때 장바구니 수량이 일치하는지 검증
describe('07. 금액·수량 정합성', () => {
  beforeEach(async () => {
    await loginAsValidUser();
  });

  it('[TC-INTEG-001] 상세 가격이 장바구니 가격과 일치', async () => {
    await ProductListPage.openProduct(0);
    await ProductDetailPage.waitForLoad();
    const detailPrice = parseFloat(
      (await ProductDetailPage.getPrice()).replace(/[^0-9.]/g, '')
    );

    await ProductDetailPage.addToCart();
    await ProductListPage.goToCart();

    const cartPrice = await CartPage.getProductPriceNumber();
    await expect(cartPrice).toEqual(detailPrice);
  });

  it('[TC-INTEG-002] 상세에서 수량을 2로 늘리면 장바구니 수량도 2', async () => {
    await ProductListPage.openProduct(0);
    await ProductDetailPage.waitForLoad();
    await ProductDetailPage.increaseQuantity(); // 1 -> 2

    await ProductDetailPage.addToCart();
    await ProductListPage.goToCart();

    const qty = await CartPage.getQuantityNumber();
    await expect(qty).toEqual(2);
  });
});
