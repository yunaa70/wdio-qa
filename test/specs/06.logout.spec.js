const { expect } = require('@wdio/globals');
const { loginAsValidUser } = require('../helpers/flows');
const LoginPage = require('../pages/LoginPage');
const ProductListPage = require('../pages/ProductListPage');
const { ACCOUNTS } = require('../data/testData');

/**
 * 06. 로그아웃
 *
 * 로그아웃 동작과 이후 상태(로그인 화면 복귀, 재로그인 가능)를 검증한다.
 * 각 테스트는 초기화 후 로그인된 상태에서 시작한다.
 */
describe('06. 로그아웃', () => {
  beforeEach(async () => {
    await loginAsValidUser();
  });

  it('[TC-LOGOUT-001] 메뉴에 로그아웃 항목이 표시된다', async () => {
    const isLogoutVisible = await LoginPage.openMenuAndCheckLogout();

    await expect(isLogoutVisible).toBe(true);
  });

  it('[TC-LOGOUT-002] 로그아웃하면 로그인 화면으로 이동한다', async () => {
    await LoginPage.logout();

    await expect(await LoginPage.isLoginScreenDisplayed()).toBe(true);
  });

  it('[TC-LOGOUT-003] 로그아웃 후 다시 로그인할 수 있다', async () => {
    await LoginPage.logout();
    await LoginPage.login(ACCOUNTS.valid.username, ACCOUNTS.valid.password);

    await expect(await ProductListPage.isDisplayedOnScreen()).toBe(true);
  });

  it('[TC-LOGOUT-004] 로그아웃 후 뒤로가기해도 로그인 화면이 유지된다', async () => {
    await LoginPage.logout();
    await LoginPage.goBack();

    await expect(await LoginPage.isLoginScreenDisplayed()).toBe(true);
  });
});
