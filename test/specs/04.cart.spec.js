// 04. 장바구니 — 담기/배지/표시/삭제/결제 진입
const { expect } = require('@wdio/globals');
const { loginAsValidUser, addFirstProductToCart } = require('../helpers/flows');
const ProductListPage = require('../pages/ProductListPage');
const CartPage = require('../pages/CartPage');

describe('04. 장바구니', () => {
  beforeEach(async () => {
    await loginAsValidUser();
    await addFirstProductToCart();
  });

  it('[TC-CART-001] 담은 상품명 노출', async () => {
    await expect(await CartPage.isProductDisplayed()).toBe(true);
  });

  it('[TC-CART-002] 상품 가격 노출', async () => {
    const price = await CartPage.getProductPrice();
    await expect(price).not.toBe('');
  });

  it('[TC-CART-003] 상품 수량 노출', async () => {
    const quantity = await CartPage.getQuantity();
    await expect(quantity).not.toBe('');
  });

  it('[TC-CART-004] 결제 진행 버튼 노출', async () => {
    await expect(await CartPage.isCheckoutButtonDisplayed()).toBe(true);
  });

  it('[TC-CART-005] 상품 삭제 시 목록에서 제거', async () => {
    await CartPage.removeItem();

    await expect(await CartPage.isProductDisplayed()).toBe(false);
  });

  it('[TC-CART-006] 결제 진행 시 결제 화면으로 이동', async () => {
    await CartPage.proceedToCheckout();

    // 결제 화면 진입은 05 결제 spec에서 상세 검증하므로, 여기서는 이동만 확인
    const movedToCheckout = !(await ProductListPage.isDisplayedOnScreen());
    await expect(movedToCheckout).toBe(true);
  });
});
