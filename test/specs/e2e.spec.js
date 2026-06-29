// 07. E2E 구매 동작 
// 실제 사용자의 전체 구매 흐름을 하나의 시나리오로 검증
// 로그인 -> 상품 선택 -> 장바구니 담기 -> 결제 -> 주문 완료
const { expect } = require('@wdio/globals');
const { resetApp } = require('../helpers/app');
const LoginPage = require('../pages/LoginPage');
const ProductListPage = require('../pages/ProductListPage');
const ProductDetailPage = require('../pages/ProductDetailPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');
const { ACCOUNTS, SHIPPING, PAYMENT } = require('../data/testData');

describe('07. E2E 구매 여정', () => {
  it('[TC-E2E-001] 로그인부터 주문 완료까지 전체 구매 플로우가 성공한다', async () => {

    // --- Step 1. 로그인 ---
    await resetApp();
    await ProductListPage.waitForLoad();
    await LoginPage.login(ACCOUNTS.valid.username, ACCOUNTS.valid.password);
    await ProductListPage.waitForLoad();

    // 로그인 후 상품 목록 정상 진입
    await expect(await ProductListPage.isDisplayedOnScreen()).toBe(true);
    const productCount = await ProductListPage.getProductCount();
    await expect(productCount).toBeGreaterThan(0);

    // --- Step 2. 상품 선택 & 상세 정보 확인 ---
    await ProductListPage.openProduct(0);
    await ProductDetailPage.waitForLoad();

    // 상세 화면 정보 저장
    const detailTitle = await ProductDetailPage.getTitle();

    await expect(await ProductDetailPage.isTitleDisplayed()).toBe(true);
    await expect(await ProductDetailPage.isPriceDisplayed()).toBe(true);

    // --- Step 3. 장바구니 담기 & 데이터 일관성 검증 ---
    await ProductDetailPage.addToCart();
    await ProductListPage.goToCart();

    await expect(await CartPage.isProductDisplayed()).toBe(true);

    // 상세에서 본 상품명이 장바구니에서도 동일한지 확인
    const cartTitle = await CartPage.getProductTitle();
    await expect(cartTitle).toBe(detailTitle);

    // --- Step 4. 결제 진행 ---
    await CartPage.proceedToCheckout();
    await expect(await CheckoutPage.isShippingPageDisplayed()).toBe(true);

    await CheckoutPage.enterShippingInfo(SHIPPING.valid);
    await CheckoutPage.goToPayment();
    await CheckoutPage.enterPaymentInfo(PAYMENT.valid);
    await CheckoutPage.reviewOrder();
    await CheckoutPage.placeOrder();

    // --- Step 5. 주문 완료 검증 ---
    await expect(await CheckoutPage.isOrderComplete()).toBe(true);
  });
});