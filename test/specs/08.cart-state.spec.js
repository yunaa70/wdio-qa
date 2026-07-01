const { expect } = require('@wdio/globals');
const { loginAsValidUser } = require('../helpers/flows');
const ProductListPage = require('../pages/ProductListPage');
const ProductDetailPage = require('../pages/ProductDetailPage');
const CartPage = require('../pages/CartPage');

// 08. 장바구니 상태 일관성
// 여러 상품을 담고 일부를 삭제했을 때, 남은 상품 개수가 정확히 반영되는지 검증
describe('08. 장바구니 상태 일관성', () => {
  beforeEach(async () => {
    await loginAsValidUser();
  });

  it('[TC-STATE-001] 상품 2개 담으면 장바구니에 2개가 표시됨', async () => {
    // 첫 상품 담기 (담아도 상세 화면에 그대로 있음)
    await ProductListPage.openProduct(0);
    await ProductDetailPage.waitForLoad();
    await ProductDetailPage.addToCart();

    // 목록으로 복귀 후 두 번째 상품 담기
    await ProductDetailPage.goBack();
    await ProductListPage.waitForLoad();
    await ProductListPage.openProduct(3);
    await ProductDetailPage.waitForLoad();
    await ProductDetailPage.addToCart();

    // 장바구니 이동 후 개수 확인
    await ProductListPage.goToCart();
    await expect(await CartPage.getItemCount()).toEqual(2);
  });

  it('[TC-STATE-002] 2개 중 1개를 삭제하면 1개만 남음', async () => {
    await ProductListPage.openProduct(0);
    await ProductDetailPage.waitForLoad();
    await ProductDetailPage.addToCart();

    await ProductDetailPage.goBack();
    await ProductListPage.waitForLoad();
    await ProductListPage.openProduct(2);
    await ProductDetailPage.waitForLoad();
    await ProductDetailPage.addToCart();

    await ProductListPage.goToCart();
    await CartPage.removeItem();

    await expect(await CartPage.getItemCount()).toEqual(1);
  });
});