// 모든 locator를 화면별로 모아둔다. page/spec은 여기만 참조한다.
// 우선순위: accessibilityId(~) > resource-id(id=) > uiautomator(android=)

const PKG = 'com.saucelabs.mydemoapp.android';

module.exports = {
  COMMON: {
    MENU_BTN: `id=${PKG}:id/menuIV`,
    CART_ICON: `id=${PKG}:id/cartIV`,
    // 메뉴 항목은 텍스트 기반 (다국어 환경이면 별도 관리 권장)
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
    FULL_NAME: `id=${PKG}:id/nameET`,
    ADDRESS: `id=${PKG}:id/address1ET`,
    CITY: `id=${PKG}:id/cityET`,
    ZIP: `id=${PKG}:id/zipET`,
    COUNTRY: `id=${PKG}:id/countryET`,
    TO_PAYMENT_BTN: `id=${PKG}:id/toPaymentBt`,
    CARD_NUMBER: `id=${PKG}:id/cardNumberET`,
    EXPIRY: `id=${PKG}:id/expirationDateET`,
    SECURITY_CODE: `id=${PKG}:id/securityCodeET`,
    REVIEW_BTN: `id=${PKG}:id/reviewOrderBt`,
    ORDER_COMPLETE: `id=${PKG}:id/completeTV`,
  },

  APP_ID: PKG,
};
