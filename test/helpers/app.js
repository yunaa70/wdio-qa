const { driver } = require('@wdio/globals');
const { APP_ID } = require('../constants/selectors');

/**
 * 앱 생명주기 관리 헬퍼
 *
 * 기존 방식(매 테스트 restartApp)은 안정적이지만 느림
 * 여기서는 두 가지 수준을 제공해, 테스트가 필요에 따라 선택할 수 있음
 * - resetApp(): 완전 재시작 (상태 오염을 확실히 차단해야 할 때)
 * - relaunch(): 앱만 다시 활성화 (가벼움)
 */

/**
 * 앱을 완전히 종료 후 재시작
 * 로그인 상태/장바구니 등 모든 상태가 초기화되어야 할 때 사용
 */
async function resetApp() {
  await driver.terminateApp(APP_ID);
  await driver.activateApp(APP_ID);
}

/**
 * 앱을 다시 전면으로 가져오기 (상태 유지)
 * 백그라운드에서 복귀시키는 가벼운 동작
 */
async function relaunch() {
  await driver.activateApp(APP_ID);
}

module.exports = { resetApp, relaunch };
