// 05. 결제 — 배송정보 입력 + 주문 완료 
// 미입력 차단도 검증
const { expect } = require('@wdio/globals');
const { loginAsValidUser, addFirstProductToCart } = require('../helpers/flows');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');
const { SHIPPING, PAYMENT } = require('../data/testData');

describe('05. 결제 플로우', () => {
  beforeEach(async () => {
    await loginAsValidUser();
    await addFirstProductToCart();
    await CartPage.proceedToCheckout();
  });

  it('[TC-CHECK-001] 결제 진행 시 배송지 입력 화면이 노출', async () => {
    await expect(await CheckoutPage.isShippingPageDisplayed()).toBe(true);
  });

  it('[TC-CHECK-002] 배송정보 미입력 시 다음으로 넘어가지 않음', async () => {
    await CheckoutPage.goToPayment();

    await expect(await CheckoutPage.isShippingPageDisplayed()).toBe(true);
  });

  it('[TC-CHECK-003] 유효한 배송지 입력 후 결제수단 화면으로 이동', async () => {
    await CheckoutPage.enterShippingInfo(SHIPPING.valid);
    await CheckoutPage.goToPayment();

    // 결제수단 화면 진입 = 배송지 화면을 벗어남
    await expect(await CheckoutPage.isShippingPageDisplayed()).toBe(false);
  });

  it('[TC-CHECK-004] 결제수단 미입력 시 주문이 완료되지 않음', async () => {
    await CheckoutPage.enterShippingInfo(SHIPPING.valid);
    await CheckoutPage.goToPayment();
    await CheckoutPage.reviewOrder();

    await expect(await CheckoutPage.isOrderComplete()).toBe(false);
  });

  it('[TC-CHECK-005] 배송지+결제수단 입력 후 주문 완료', async () => {
    await CheckoutPage.enterShippingInfo(SHIPPING.valid);
    await CheckoutPage.goToPayment();
    await CheckoutPage.enterPaymentInfo(PAYMENT.valid);
    await CheckoutPage.reviewOrder();
    await CheckoutPage.placeOrder();
    await expect(await CheckoutPage.isOrderComplete()).toBe(true);
  });
});
