// 01. 로그인 — 정상 로그인 + 입력 검증(빈 값/잠긴 계정)
const { expect } = require('@wdio/globals');
const { resetApp } = require('../helpers/app');
const LoginPage = require('../pages/LoginPage');
const ProductListPage = require('../pages/ProductListPage');
const { ACCOUNTS } = require('../data/testData');


describe('01. 로그인', () => {
  beforeEach(async () => {
    await resetApp();
    await ProductListPage.waitForLoad();
  });

  it('[TC-LOGIN-001] 유효한 계정으로 로그인 시 상품 목록으로 이동', async () => {
    await LoginPage.login(ACCOUNTS.valid.username, ACCOUNTS.valid.password);

    await expect(await ProductListPage.isDisplayedOnScreen()).toBe(true);
  });

  it('[TC-LOGIN-002] 아이디가 비어 있으면 에러 노출', async () => {
    await LoginPage.login('', ACCOUNTS.valid.password);

    await expect(await LoginPage.isUsernameErrorDisplayed()).toBe(true);
  });

  it('[TC-LOGIN-003] 비밀번호가 비어 있으면 에러 노출', async () => {
    await LoginPage.login(ACCOUNTS.valid.username, '');

    await expect(await LoginPage.isPasswordErrorDisplayed()).toBe(true);
  });

  it('[TC-LOGIN-004] 잠긴 계정으로 로그인 시 에러 노출', async () => {
    await LoginPage.login(ACCOUNTS.locked.username, ACCOUNTS.locked.password);

    await expect(await LoginPage.isPasswordErrorDisplayed()).toBe(true);
  });

  it('[TC-LOGIN-005] 빈 아이디 에러 메시지가 비어있지 않음', async () => {
    await LoginPage.login('', ACCOUNTS.valid.password);

    const errorText = await LoginPage.getUsernameError();
    await expect(errorText).not.toBe('');
  });

  it('[TC-LOGIN-006] 빈 비밀번호 에러 메시지가 비어있지 않음', async () => {
    await LoginPage.login(ACCOUNTS.valid.username, '');

    const errorText = await LoginPage.getPasswordError();
    await expect(errorText).not.toBe('');
  });
});
