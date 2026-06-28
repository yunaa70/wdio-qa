# SauceLabs My Demo App · 모바일 E2E 자동화

Appium + WebdriverIO + Mocha로 짠 Android E2E 테스트입니다.
수동으로 반복하던 회귀 검증을 자동화로 옮기는 걸 목표로, POM 구조와 Allure 리포트를 붙였습니다.

대상 앱: SauceLabs My Demo App (`com.saucelabs.mydemoapp.android`)

## 테스트 범위 (35 케이스)

| 영역 | 케이스 | 내용 |
|------|--------|------|
| 01. 로그인 | 6 | 정상 / 빈 값 / 잠긴 계정 / 에러 메시지 |
| 02. 상품 목록 | 6 | 표시 / 개수 / 상세 진입 / 가격 정렬 |
| 03. 상품 상세 | 8 | 정보 표시 / 수량 증감 / 경계값(0) / 장바구니 |
| 04. 장바구니 | 6 | 담기 / 표시 / 삭제 / 결제 진입 |
| 05. 결제 | 5 | 배송지 / 결제수단 / 주문 완료 / 미입력 차단 |
| 06. 로그아웃 | 4 | 메뉴 / 화면 전환 / 재로그인 |

정상 흐름만이 아니라 빈 값·잠긴 계정·미입력 같은 예외(negative) 케이스를 함께 넣었습니다.

## 구조

```
test/
├─ specs/        시나리오 + 단언 (TC-ID 부여)
├─ pages/        BasePage + 화면별 Page Object
├─ constants/    selectors — locator 중앙 관리
├─ helpers/      app(앱 생명주기), flows(공통 준비 흐름)
└─ data/         테스트 데이터 (계정/배송/결제)
wdio.conf.js     WebdriverIO 설정 + Allure
```

설계하면서 신경 쓴 것들:

- **레이어 분리** — spec은 "무엇을 검증하는가"만 담고, 화면 조작은 Page에 둡니다. spec을 읽으면 의도가 바로 보이게.
- **locator 중앙화** — spec/page에 raw locator를 직접 쓰지 않고 `selectors.js`만 참조합니다. 앱이 바뀌면 한 곳만 고치면 됩니다. 우선순위는 accessibilityId > resource-id > uiautomator 순으로 안정적인 걸 먼저 씁니다.
- **명시적 대기** — `pause` 대신 BasePage가 "보일 때까지" 기다린 뒤 동작하게 했습니다. flaky를 줄이려는 목적입니다.
- **테스트 독립성** — `beforeEach`에서 앱을 초기화(`terminateApp`+`activateApp`)해, 앞 테스트가 뭘 했든 항상 같은 상태에서 시작합니다. 순서를 바꿔도 결과가 같습니다.
- **데이터 분리** — 계정/결제 값을 `testData.js`로 빼서, 값이 바뀌어도 테스트 로직은 그대로 둡니다.

## 실행

```bash
npm install
cp .env.example .env   # 디바이스 정보에 맞게 수정

# 다른 터미널에서 Appium 실행
appium

npm test                 # 전체 실행
npm run allure:generate  # 리포트 생성
npm run allure:open      # 리포트 열기
```

사전 준비: Node.js 18+, Appium 2.x + UiAutomator2, Android SDK, 에뮬레이터 또는 실기기, 대상 앱 설치.

## 환경 전환

`.env` 값만 바꾸면 코드 수정 없이 디바이스/앱을 바꿀 수 있습니다.
같은 구조에서 capabilities만 교체하면 BrowserStack 같은 클라우드 디바이스팜으로도 확장할 수 있습니다.
