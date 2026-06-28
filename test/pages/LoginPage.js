const BasePage = require('./BasePage');
const { COMMON, LOGIN } = require('../constants/selectors');

// 이 앱은 실행 시 상품 목록이 먼저 뜬다. 로그인 화면은 메뉴 → "Log In"으로 진입.
class LoginPage extends BasePage {
  // 이미 로그인 화면이면 그냥 반환(멱등). 아니면 메뉴 → Log In 순으로 진입.
  async open() {
    if (await this.isDisplayed(LOGIN.USERNAME)) return;

    await this.click(COMMON.MENU_BTN);
    await this.click(COMMON.MENU_LOGIN);
    await this.waitForDisplayed(LOGIN.USERNAME);
  }

  // 화면 진입까지 포함. 빈 문자열이면 해당 필드는 건너뛴다(빈 값 검증용).
  async login(username, password) {
    await this.open();
    if (username !== '') await this.setValue(LOGIN.USERNAME, username);
    if (password !== '') await this.setValue(LOGIN.PASSWORD, password);
    await this.click(LOGIN.LOGIN_BTN);
  }

  async getUsernameError() {
    return this.getText(LOGIN.USERNAME_ERROR);
  }

  async getPasswordError() {
    return this.getText(LOGIN.PASSWORD_ERROR);
  }

  async isUsernameErrorDisplayed() {
    return this.isDisplayed(LOGIN.USERNAME_ERROR);
  }

  async isPasswordErrorDisplayed() {
    return this.isDisplayed(LOGIN.PASSWORD_ERROR);
  }

  // 메뉴 → Log Out → 확인 다이얼로그 OK까지.
  async logout() {
    await this.click(COMMON.MENU_BTN);
    await this.click(COMMON.MENU_LOGOUT);
    await this.click(COMMON.DIALOG_OK);
  }

  /** 메뉴를 열어 로그아웃 항목이 보이는지 확인 (메뉴는 열린 상태로 둠) */
  async openMenuAndCheckLogout() {
    await this.click(COMMON.MENU_BTN);
    return this.isDisplayed(COMMON.MENU_LOGOUT);
  }

  async isLoginScreenDisplayed() {
    return this.isDisplayed(LOGIN.USERNAME);
  }
}

module.exports = new LoginPage();
