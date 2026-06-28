## SauceLabs My Demo App · 모바일 E2E 자동화

Appium + WebdriverIO + Mocha 기반 Android E2E 테스트 자동화.
POM(Page Object Model) 아키텍처와 Allure 리포트를 갖춘 포트폴리오 프로젝트.

### 테스트 범위 (총 35 케이스)

| 영역 | 케이스 | 내용 |
|------|--------|------|
| 01. 로그인 | 6 | 정상 / 빈 값 / 잠긴 계정 / 에러 메시지 검증 |
| 02. 상품 목록 | 6 | 표시 / 개수 / 상세 진입 / 가격 정렬 |
| 03. 상품 상세 | 8 | 정보 표시 / 수량 증감 / 경계값(0) / 장바구니 |
| 04. 장바구니 | 6 | 담기 / 표시 / 삭제 / 결제 진입 |
| 05. 결제 | 5 | 배송지 / 결제수단 / 주문완료 / 미입력 검증 |
| 06. 로그아웃 | 4 | 메뉴 / 화면 전환 / 재로그인 |

### 아키텍처

```
test/
├─ specs/        시나리오 + 단언 (TC-ID 부여)
├─ pages/        BasePage + 화면별 Page Object
├─ constants/    selectors (모든 locator 중앙 관리)
├─ helpers/      app(생명주기), flows(공통 준비 흐름)
└─ data/         테스트 데이터 (계정/배송/결제)
wdio.conf.js     WebdriverIO 설정 + Allure 리포터
```

설계 원칙:
- 레이어 분리 — spec은 "무엇을 검증하는가"만, Page는 "화면을 어떻게 조작하는가"만.
- locator 중앙화 — spec에 raw locator 금지, 변경 시 selectors.js 한 곳만 수정.
- 명시적 대기 — BasePage가 모든 상호작용에 대기를 내장 (pause 남용 제거).
- 테스트 독립성 — 전역 상태 공유 없이 각 테스트가 동일한 시작 상태 보장.
- 데이터 분리 — 계정/결제 정보를 코드에서 분리.

### 사전 준비

- Node.js 18+
- Appium 2.x + UiAutomator2 드라이버
- Android SDK, 에뮬레이터 또는 실기기
- SauceLabs My Demo App 설치 (`com.saucelabs.mydemoapp.android`)
- Allure CLI (리포트 확인용)

### 설치 및 실행

```bash
npm install
cp .env.example .env   # 디바이스 정보에 맞게 수정

# 별도 터미널에서 Appium 실행
appium

# 전체 테스트
npm test

# 리포트 생성 + 열기
npm run allure:generate
npm run allure:open
```

### 환경 전환

`.env`의 값만 바꾸면 코드 수정 없이 디바이스/앱을 전환할 수 있다.
동일 구조로 capabilities만 교체하면 BrowserStack/SauceLabs 같은
클라우드 디바이스팜으로 확장 가능하다.
