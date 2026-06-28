const { $, $$, driver } = require('@wdio/globals');

/**
 * 모든 Page Object의 부모.
 * 모든 상호작용에 명시적 대기를 넣어 flaky를 줄이고,
 * driver 호출을 여기로 모아 대기 정책을 한곳에서 관리한다.
 */
class BasePage {
  get defaultTimeout() {
    return 10000;
  }

  async waitForDisplayed(selector, timeout = this.defaultTimeout) {
    const el = await $(selector);
    await el.waitForDisplayed({
      timeout,
      timeoutMsg: `not displayed in ${timeout}ms → ${selector}`,
    });
    return el;
  }

  async click(selector) {
    const el = await this.waitForDisplayed(selector);
    await el.click();
  }

  async setValue(selector, value) {
    const el = await this.waitForDisplayed(selector);
    await el.clearValue();
    await el.setValue(value);
  }

  async getText(selector) {
    const el = await this.waitForDisplayed(selector);
    return el.getText();
  }

  // 단언이 아니라 분기 판단용. 짧게 대기하고 없으면 false.
  async isDisplayed(selector, timeout = 3000) {
    try {
      const el = await $(selector);
      await el.waitForDisplayed({ timeout });
      return true;
    } catch {
      return false;
    }
  }

  async getAll(selector) {
    return $$(selector);
  }

  async scrollToText(text) {
    const ui =
      'new UiScrollable(new UiSelector().scrollable(true))' +
      `.scrollIntoView(new UiSelector().textContains("${text}"))`;
    await $(`android=${ui}`).waitForDisplayed({
      timeout: this.defaultTimeout,
      timeoutMsg: `not found after scroll → "${text}"`,
    });
  }

  // resource-id 기반이라 +/- 같은 텍스트 없는 버튼에도 쓴다.
  async scrollToElement(selector) {
    const resourceId = selector.replace(/^id=/, '');
    const ui =
      'new UiScrollable(new UiSelector().scrollable(true))' +
      `.scrollIntoView(new UiSelector().resourceId("${resourceId}"))`;
    try {
      await $(`android=${ui}`).waitForExist({ timeout: this.defaultTimeout });
    } catch {
      // 스크롤 영역이 없으면(이미 다 보임) 그냥 진행
    }
  }

  async goBack() {
    await driver.back();
  }
}

module.exports = BasePage;
