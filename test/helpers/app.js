const { driver } = require('@wdio/globals');
const { APP_ID } = require('../constants/selectors');

// 매번 restartApp 하면 안전하지만 느려서, 두 단계로 나눴다.
// resetApp: 완전 재시작(상태 초기화), relaunch: 앱만 다시 전면으로(가벼움).

async function resetApp() {
  await driver.terminateApp(APP_ID);
  await driver.activateApp(APP_ID);
}

async function relaunch() {
  await driver.activateApp(APP_ID);
}

module.exports = { resetApp, relaunch };
