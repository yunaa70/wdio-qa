// WebdriverIO 설정. 로컬 Appium(4723) + UiAutomator2.
// 디바이스/앱 정보는 .env로 주입해 코드 수정 없이 환경을 바꾼다.
exports.config = {
  runner: 'local',

  port: 4723,
  path: '/',

  specs: ['./test/specs/**/*.spec.js'],
  // 모바일은 동시 실행이 까다로우므로 순차 실행
  maxInstances: 1,

  capabilities: [
    {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:deviceName': process.env.DEVICE_NAME || 'emulator-5554',
      // 비워두면 연결된 디바이스의 OS 버전을 자동 사용
      'appium:platformVersion': process.env.PLATFORM_VERSION || '',
      'appium:appPackage': process.env.APP_PACKAGE || 'com.saucelabs.mydemoapp.android',
      'appium:appActivity':
        process.env.APP_ACTIVITY || '.view.activities.SplashActivity',
      'appium:autoGrantPermissions': true,
      'appium:newCommandTimeout': 240,
    },
  ],

  logLevel: 'error',
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 90000,
  },

  reporters: [
    'spec',
    [
      'allure',
      {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: false,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
  ],

  // 실패한 테스트만 스크린샷을 찍어 Allure에 첨부한다.
  afterTest: async function (test, context, { passed }) {
    if (!passed) {
      await browser.takeScreenshot();
    }
  },
};
