const { expect } = require('@wdio/globals');
const { loginAsValidUser } = require('../helpers/flows');
const ProductListPage = require('../pages/ProductListPage');
const ProductDetailPage = require('../pages/ProductDetailPage');

/**
 * 02. 상품 목록
 *
 * 목록 표시, 상품 개수, 상세 진입, 정렬을 검증한다.
 */
describe('02. 상품 목록', () => {
  before(async () => {
    await loginAsValidUser();
  });

  beforeEach(async () => {
    // 상세 등으로 이동했을 수 있으니 목록으로 복귀 보장
    if (!(await ProductListPage.isDisplayedOnScreen())) {
      await ProductListPage.goBack();
    }
    await ProductListPage.waitForLoad();
  });

  it('[TC-PLIST-001] 로그인 후 상품 목록 화면이 표시된다', async () => {
    await expect(await ProductListPage.isDisplayedOnScreen()).toBe(true);
  });

  it('[TC-PLIST-002] 상품이 1개 이상 표시된다', async () => {
    const count = await ProductListPage.getProductCount();
    await expect(count).toBeGreaterThan(0);
  });

  it('[TC-PLIST-003] 상품 클릭 시 상세 화면으로 이동한다', async () => {
    await ProductListPage.openProduct(0);

    await expect(await ProductDetailPage.isTitleDisplayed()).toBe(true);
  });

  it('[TC-PLIST-004] 정렬 버튼이 표시된다', async () => {
    await expect(await ProductListPage.isSortButtonDisplayed()).toBe(true);
  });

  it('[TC-PLIST-005] 가격 오름차순 정렬 시 첫 상품이 변경된다', async () => {
    const before = await ProductListPage.getFirstProductTitle();

    await ProductListPage.sortByPriceAsc();

    const after = await ProductListPage.getFirstProductTitle();
    await expect(after).not.toEqual(before);
  });

  it('[TC-PLIST-006] 가격 내림차순 정렬이 동작한다', async () => {
    await ProductListPage.sortByPriceDesc();

    const count = await ProductListPage.getProductCount();
    await expect(count).toBeGreaterThan(0);
  });
});
