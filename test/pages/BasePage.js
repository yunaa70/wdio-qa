const { $, $$, driver } = require('@wdio/globals');

/**
 * 모든 Page Object의 부모
 *
 * 설계 원칙:
 * - 모든 상호작용은 명시적 대기를 포함 (pause/sleep 지양)
 * - Page Object는 이 메서드들만 사용하고 driver를 직접 만지지 않음
 *   -> 대기/재시도 정책이 한 곳에 모여 안정성을 보장
 * - 액션마다 의미 있는 동작을 보장해, 플래키(flaky) 테스트를 줄임
 */
class BasePage {
  /** 기본 명시적 대기 시간 */
  get defaultTimeout() {
    return 10000;
  }

  /**
   * 요소가 표시될 때까지 대기 후 반환
   * @param {string} selector
   * @param {number} [timeout]
   * @returns {Promise<WebdriverIO.Element>}
   */
  async waitForDisplayed(selector, timeout = this.defaultTimeout) {
    const element = await $(selector);
    await element.waitForDisplayed({
      timeout,
      timeoutMsg: `요소가 ${timeout}ms 내에 표시되지 않았습니다 → ${selector}`,
    });
    return element;
  }

  /**
   * 요소를 클릭 -> 표시될 때까지 대기 후 클릭
   * @param {string} selector
   */
  async click(selector) {
    const element = await this.waitForDisplayed(selector); // 먼저 나타날 때까지 기다림
    await element.click();                                // 그다음 클릭
  }

  /**
   * 텍스트 입력 -> 기존 값을 지우고 새로 입력
   * @param {string} selector
   * @param {string} value
   */
  async setValue(selector, value) {
    const element = await this.waitForDisplayed(selector);
    await element.clearValue();
    await element.setValue(value);
  }

  /**
   * 요소의 텍스트 반환
   * @param {string} selector
   * @returns {Promise<string>}
   */
  async getText(selector) {
    const element = await this.waitForDisplayed(selector);
    return element.getText();
  }

  /**
   * 요소 표시 여부를 boolean으로 반환 (단언 아님, 분기 판단용)
   * 짧은 대기 후 판단하며, 없으면 false
   * @param {string} selector
   * @param {number} [timeout]
   * @returns {Promise<boolean>}
   */
  async isDisplayed(selector, timeout = 3000) {
    try {
      const element = await $(selector);
      await element.waitForDisplayed({ timeout });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * 셀렉터에 매칭되는 모든 요소를 반환
   * @param {string} selector
   * @returns {Promise<WebdriverIO.Element[]>}
   */
  async getAll(selector) {
    return $$(selector);
  }

  /**
   * UiScrollable로 특정 텍스트가 보일 때까지 스크롤
   * 좌표 기반 스크롤보다 안정적임 (해상도 독립적)
   * @param {string} text
   */
  async scrollToText(text) {
    const uiSelector =
      'new UiScrollable(new UiSelector().scrollable(true))' +
      `.scrollIntoView(new UiSelector().textContains("${text}"))`;
    await $(`android=${uiSelector}`).waitForDisplayed({
      timeout: this.defaultTimeout,
      timeoutMsg: `스크롤 후에도 "${text}"를 찾지 못했습니다.`,
    });
  }

  /**
   * 특정 요소가 화면에 보일 때까지 UiScrollable로 스크롤
   * resource-id 기반이라 텍스트가 없는 버튼(+/-)에도 동작
   * @param {string} selector  'id=...' 형식의 셀렉터
   */
  async scrollToElement(selector) {
    // 'id=com...:id/plusIV' 에서 resource-id 부분만 추출
    const resourceId = selector.replace(/^id=/, '');
    const uiSelector =
      'new UiScrollable(new UiSelector().scrollable(true))' +
      `.scrollIntoView(new UiSelector().resourceId("${resourceId}"))`;
    try {
      await $(`android=${uiSelector}`).waitForExist({ timeout: this.defaultTimeout });
    } catch {
      // 스크롤이 불가능한 화면(이미 다 보이는 상태)이면 무시하고 진행
    }
  }

  // BasePage.js 에 추가
  /**
   * 요소가 DOM에 존재하면 클릭
   * bounds가 [0,0][0,0]이라 waitForDisplayed가 실패하는
   * 요소(스크롤뷰 바깥 버튼 등)를 위한 안전한 클릭
   * @param {string} selector
   */
  async clickWhenExists(selector) {
    const element = await $(selector);
    await element.waitForExist({
      timeout: this.defaultTimeout,
      timeoutMsg: `요소가 존재하지 않습니다 → ${selector}`,
    });
    await element.click();
  }

  /**
   * 소프트 키보드가 떠 있으면 내림
   */
  async hideKeyboard() {
    try {
      if (await driver.isKeyboardShown()) {
        await driver.hideKeyboard();
      }
    } catch {
      // 미지원 환경이면 무시
    }
  }


  /**
   * 시스템 뒤로가기
   */
  async goBack() {
    await driver.back();
  }
}

module.exports = BasePage;
