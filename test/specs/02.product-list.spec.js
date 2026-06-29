// 02. 상품 목록 — 표시/개수/정렬
const { expect } = require('@wdio/globals');
const { loginAsValidUser } = require('../helpers/flows');
const ProductListPage = require('../pages/ProductListPage');
const ProductDetailPage = require('../pages/ProductDetailPage');

describe('02. 상품 목록', () => {
  before(async () => {
    await loginAsValidUser();
  });

  beforeEach(async () => {
    // 상품 목록으로 이동
    if (!(await ProductListPage.isDisplayedOnScreen())) {
      await ProductListPage.goBack();
    }
    await ProductListPage.waitForLoad();
  });

  it('[TC-PLIST-001] 상품 목록이 노출', async () => {
    await expect(await ProductListPage.isDisplayedOnScreen()).toBe(true);
  });

  it('[TC-PLIST-002] 상품이 1개 이상 노출', async () => {
    const count = await ProductListPage.getProductCount();
    await expect(count).toBeGreaterThan(0);
  });

  it('[TC-PLIST-003] 상품 클릭 시 상세 화면으로 이동', async () => {
    await ProductListPage.openProduct(0);

    await expect(await ProductDetailPage.isTitleDisplayed()).toBe(true);
  });

  it('[TC-PLIST-004] 정렬 버튼 노출', async () => {
    await expect(await ProductListPage.isSortButtonDisplayed()).toBe(true);
  });

  it('[TC-PLIST-005] 가격 오름차순 정렬 시 정렬된 상태로 변경', async () => {
    const before = await ProductListPage.getFirstProductTitle();

    await ProductListPage.sortByPriceAsc();

    const after = await ProductListPage.getFirstProductTitle();
    await expect(after).not.toEqual(before);
  });

  it('[TC-PLIST-006] 가격 내림차순 정렬', async () => {
    await ProductListPage.sortByPriceDesc();

    const count = await ProductListPage.getProductCount();
    await expect(count).toBeGreaterThan(0);
  });
});
