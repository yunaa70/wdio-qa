const { resetApp } = require('./app');
const LoginPage = require('../pages/LoginPage');
const ProductListPage = require('../pages/ProductListPage');
const ProductDetailPage = require('../pages/ProductDetailPage');
const { ACCOUNTS } = require('../data/testData');

// 여러 spec에서 반복되는 준비 과정을 모아 beforeEach를 짧게 유지한다.

async function loginAsValidUser() {
  await resetApp();
  await ProductListPage.waitForLoad();
  await LoginPage.login(ACCOUNTS.valid.username, ACCOUNTS.valid.password);
  await ProductListPage.waitForLoad();
}

// 장바구니/결제 테스트의 공통 준비
async function addFirstProductToCart() {
  await ProductListPage.openProduct(0);
  await ProductDetailPage.addToCart();
  await ProductListPage.goToCart();
}

module.exports = { loginAsValidUser, addFirstProductToCart };
