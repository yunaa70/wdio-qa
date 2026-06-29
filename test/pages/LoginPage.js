const BasePage = require('./BasePage');
const { COMMON, LOGIN } = require('../constants/selectors');

/**
 * 로그인 화면
 *
 * 이 앱은 실행 시 상품 목록이 먼저 뜨므로, 로그인 화면 진입은 메뉴 -> "Log In"을 거쳐야 함
 * open()이 이를 캡슐화
 */
class LoginPage extends BasePage {
  /**
   * 로그인 화면으로 진입
   * 이미 로그인 화면이면 아무 것도 하지 않음
   */
  async open() {
    if (await this.isDisplayed(LOGIN.USERNAME)) return;

    await this.click(COMMON.MENU_BTN);
    await this.click(COMMON.MENU_LOGIN);
    await this.waitForDisplayed(LOGIN.USERNAME);
  }

  /**
   * 로그인 동작 -> 로그인 화면 진입
   * @param {string} username
   * @param {string} password
   */
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

  /**
   * 메뉴를 열어 로그아웃 동작
   * 확인 다이얼로그의 OK까지 누름
   */
  async logout() {
    await this.click(COMMON.MENU_BTN);
    await this.click(COMMON.MENU_LOGOUT);
    await this.click(COMMON.DIALOG_OK);
  }

  // 메뉴를 열어 로그아웃 항목이 보이는지 확인 (메뉴는 열린 상태로 둠)
  async openMenuAndCheckLogout() {
    await this.click(COMMON.MENU_BTN);
    return this.isDisplayed(COMMON.MENU_LOGOUT);
  }

  // 로그인 화면(아이디 입력칸)이 표시되는지
  async isLoginScreenDisplayed() {
    return this.isDisplayed(LOGIN.USERNAME);
  }
}

module.exports = new LoginPage();
