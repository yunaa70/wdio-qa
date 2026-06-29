/**
 * 앱의 모든 locator를 화면별로 중앙 관리
 *
 * 원칙:
 * - spec이나 page 메서드는 절대 raw locator 문자열을 직접 쓰지 않음
 *   반드시 이 파일을 참조 -> locator 변경 시 여기서 수정
 * - 안정성 우선순위: accessibilityId(~) > resource-id > uiautomator > xpath
 */

const PKG = 'com.saucelabs.mydemoapp.android';

module.exports = {
  COMMON: {
    MENU_BTN: `id=${PKG}:id/menuIV`,
    CART_ICON: `id=${PKG}:id/cartIV`,
    // 메뉴 항목은 텍스트 기반
    MENU_LOGIN: 'android=new UiSelector().text("Log In")',
    MENU_LOGOUT: 'android=new UiSelector().text("Log Out")',
    DIALOG_OK: 'id=android:id/button1',
  },

  LOGIN: {
    USERNAME: `id=${PKG}:id/nameET`,
    PASSWORD: `id=${PKG}:id/passwordET`,
    LOGIN_BTN: '~Tap to login with given credentials',
    USERNAME_ERROR: `id=${PKG}:id/nameErrorTV`,
    PASSWORD_ERROR: `id=${PKG}:id/passwordErrorTV`,
  },

  PRODUCT_LIST: {
    CONTAINER: '~Displays all products of catalog',
    PRODUCT_IMAGE: '~Product Image',
    PRODUCT_TITLE: '~Product Title',
    SORT_BTN: `id=${PKG}:id/sortIV`,
    SORT_PRICE_ASC: `id=${PKG}:id/priceAscCL`,
    SORT_PRICE_DESC: `id=${PKG}:id/priceDesCL`,
  },

  PRODUCT_DETAIL: {
    TITLE: `id=${PKG}:id/productTV`,
    PRICE: `id=${PKG}:id/priceTV`,
    PLUS_BTN: `id=${PKG}:id/plusIV`,
    MINUS_BTN: `id=${PKG}:id/minusIV`,
    QUANTITY: `id=${PKG}:id/noTV`,
    ADD_TO_CART_BTN: `id=${PKG}:id/cartBt`,
  },

  CART: {
    PRODUCT_TITLE: `id=${PKG}:id/titleTV`,
    PRODUCT_PRICE: `id=${PKG}:id/priceTV`,
    QUANTITY: `id=${PKG}:id/noTV`,
    REMOVE_BTN: '~Removes product from cart',
    CHECKOUT_BTN: '~Confirms products for checkout',
    EMPTY_CART: `id=${PKG}:id/noItemTitleTV`,
  },

  CHECKOUT: {
    SHIPPING_TITLE: `id=${PKG}:id/enterShippingAddressTV`,
    FULL_NAME: `id=${PKG}:id/fullNameET`,
    ADDRESS: `id=${PKG}:id/address1ET`,
    CITY: `id=${PKG}:id/cityET`,
    ZIP: `id=${PKG}:id/zipET`,
    COUNTRY: `id=${PKG}:id/countryET`,
    // To Payment 버튼 : content-desc로 구분 (resource-id가 Review와 겹침)
    TO_PAYMENT_BTN: '~Saves user info for checkout',
    CARD_NUMBER: `id=${PKG}:id/cardNumberET`,
    EXPIRY: `id=${PKG}:id/expirationDateET`,
    SECURITY_CODE: `id=${PKG}:id/securityCodeET`,
    // Review Order 버튼 : content-desc로 구분
    REVIEW_BTN: '~Saves payment info and launches screen to review checkout data',
    PLACE_ORDER_BTN: 'android=new UiSelector().text("Place Order")',
    ORDER_COMPLETE: `id=${PKG}:id/completeTV`,
    PAYMENT_FULL_NAME: `id=${PKG}:id/nameET`,  // 결제화면 카드소유자 이름
  },

  APP_ID: PKG,
};
