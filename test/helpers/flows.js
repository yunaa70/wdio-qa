const { resetApp } = require('./app');
const LoginPage = require('../pages/LoginPage');
const ProductListPage = require('../pages/ProductListPage');
const ProductDetailPage = require('../pages/ProductDetailPage');
const { ACCOUNTS } = require('../data/testData');

/**
 * 여러 spec에서 반복되는 준비 흐름(setup flow)을 모은다.
 * spec의 beforeEach를 간결하게 유지하고 중복을 제거한다.
 */

/**
 * 앱 초기화 후 정상 계정으로 로그인하고 상품 목록까지 도달한다.
 */
async function loginAsValidUser() {
  await resetApp();
  await ProductListPage.waitForLoad();
  await LoginPage.login(ACCOUNTS.valid.username, ACCOUNTS.valid.password);
  await ProductListPage.waitForLoad();
}

/**
 * 로그인된 상태에서 첫 상품을 장바구니에 담고 장바구니 화면으로 이동한다.
 * (장바구니/결제 테스트의 공통 준비)
 */
async function addFirstProductToCart() {
  await ProductListPage.openProduct(0);
  await ProductDetailPage.addToCart();
  await ProductListPage.goToCart();
}

module.exports = { loginAsValidUser, addFirstProductToCart };
