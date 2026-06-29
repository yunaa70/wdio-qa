// 06. 로그아웃 ㅡ 로그인 화면 복귀/재로그인
const { expect } = require('@wdio/globals');
const { loginAsValidUser } = require('../helpers/flows');
const LoginPage = require('../pages/LoginPage');
const ProductListPage = require('../pages/ProductListPage');
const { ACCOUNTS } = require('../data/testData');

describe('06. 로그아웃', () => {
  beforeEach(async () => {
    await loginAsValidUser();
  });

  it('[TC-LOGOUT-001] 메뉴에 로그아웃 항목 노출', async () => {
    const isLogoutVisible = await LoginPage.openMenuAndCheckLogout();

    await expect(isLogoutVisible).toBe(true);
  });

  it('[TC-LOGOUT-002] 로그아웃하면 로그인 화면으로 이동', async () => {
    await LoginPage.logout();

    await expect(await LoginPage.isLoginScreenDisplayed()).toBe(true);
  });

  it('[TC-LOGOUT-003] 로그아웃 후 재로그인 가능', async () => {
    await LoginPage.logout();
    await LoginPage.login(ACCOUNTS.valid.username, ACCOUNTS.valid.password);

    await expect(await ProductListPage.isDisplayedOnScreen()).toBe(true);
  });

  it('[TC-LOGOUT-004] 로그아웃 후 뒤로가기 시 로그인 화면이 유지', async () => {
    await LoginPage.logout();
    await LoginPage.goBack();

    await expect(await LoginPage.isLoginScreenDisplayed()).toBe(true);
  });
});
