const { expect } = require('@wdio/globals');
const { loginAsValidUser } = require('../helpers/flows');
const ProductListPage = require('../pages/ProductListPage');
const ProductDetailPage = require('../pages/ProductDetailPage');

// 03. 상품 상세 — 정보 표시 + 수량 증감(경계값 포함). 매 테스트 첫 상품을 새로 연다.
describe('03. 상품 상세', () => {
  before(async () => {
    await loginAsValidUser();
  });

  beforeEach(async () => {
    // 이전 테스트가 상세에 머물러 있으면 목록으로 복귀
    if (!(await ProductListPage.isDisplayedOnScreen())) {
      await ProductListPage.goBack();
      await ProductListPage.waitForLoad();
    }
    await ProductListPage.openProduct(0);
    await ProductDetailPage.waitForLoad();
  });

  it('[TC-PDETAIL-001] 상품명이 표시된다', async () => {
    await expect(await ProductDetailPage.isTitleDisplayed()).toBe(true);
  });

  it('[TC-PDETAIL-002] 가격이 표시된다', async () => {
    await expect(await ProductDetailPage.isPriceDisplayed()).toBe(true);
  });

  it('[TC-PDETAIL-003] 상품명이 비어있지 않다', async () => {
    const title = await ProductDetailPage.getTitle();
    await expect(title).not.toBe('');
  });

  it('[TC-PDETAIL-004] 가격이 비어있지 않다', async () => {
    const price = await ProductDetailPage.getPrice();
    await expect(price).not.toBe('');
  });

  it('[TC-PDETAIL-005] + 버튼 클릭 시 수량이 1 증가한다', async () => {
    await ProductDetailPage.increaseQuantity();

    await expect(await ProductDetailPage.getQuantity()).toBe('2');
  });

  it('[TC-PDETAIL-006] + 후 - 버튼 클릭 시 수량이 1로 돌아온다', async () => {
    await ProductDetailPage.increaseQuantity();
    await ProductDetailPage.decreaseQuantity();

    await expect(await ProductDetailPage.getQuantity()).toBe('1');
  });

  it('[TC-PDETAIL-007] 수량 1에서 - 버튼 클릭 시 0으로 감소한다 (경계값)', async () => {
    await ProductDetailPage.decreaseQuantity();

    await expect(await ProductDetailPage.getQuantity()).toBe('0');
  });

  it('[TC-PDETAIL-008] 장바구니 담기 후 장바구니 아이콘이 표시된다', async () => {
    await ProductDetailPage.addToCart();

    await expect(await ProductListPage.isCartIconDisplayed()).toBe(true);
  });
});
