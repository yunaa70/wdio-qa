const BasePage = require('./BasePage');
const { CHECKOUT } = require('../constants/selectors');

// 결제 화면 : 배송지 + 결제수단 + 주문
 
class CheckoutPage extends BasePage {
  /**
   * 배송지 정보를 입력
   * @param {{fullName:string,address:string,city:string,zip:string,country:string}} info
   */
  async enterShippingInfo({ fullName, address, city, zip, country }) {
    await this.scrollToElement(CHECKOUT.FULL_NAME);
    await this.setValue(CHECKOUT.FULL_NAME, fullName);
    await this.setValue(CHECKOUT.ADDRESS, address);
    await this.setValue(CHECKOUT.CITY, city);
    await this.setValue(CHECKOUT.ZIP, zip);
    await this.scrollToElement(CHECKOUT.COUNTRY);
    await this.setValue(CHECKOUT.COUNTRY, country);
  }

  /**
   * 결제 수단 정보를 입력
   * @param {{cardNumber:string,expiry:string,securityCode:string}} info
   */
  async enterPaymentInfo({ cardNumber, expiry, securityCode }) {
    await this.setValue(CHECKOUT.PAYMENT_FULL_NAME, 'John Doe');  // 이름 먼저 입력
    await this.scrollToElement(CHECKOUT.CARD_NUMBER);
    await this.setValue(CHECKOUT.CARD_NUMBER, cardNumber);
    await this.setValue(CHECKOUT.EXPIRY, expiry);
    await this.setValue(CHECKOUT.SECURITY_CODE, securityCode);
    await this.hideKeyboard();
  }

  // 결제 수단 입력 단계로 진행
  async goToPayment() {
    await this.clickWhenExists(CHECKOUT.TO_PAYMENT_BTN);  // scrollToElement 제거
  }

  // 주문 검토(최종 확정)
  async reviewOrder() {
    await this.clickWhenExists(CHECKOUT.REVIEW_BTN);      // scrollToElement 제거
  }

  async isShippingPageDisplayed() {
    return this.isDisplayed(CHECKOUT.SHIPPING_TITLE);
  }

  async isOrderComplete() {
    return this.isDisplayed(CHECKOUT.ORDER_COMPLETE);
  }

  // 주문 검토(최종 확정)
  async reviewOrder() {
    await this.clickWhenExists(CHECKOUT.REVIEW_BTN);
  }

 // 최종 주문 확정 (Place Order)
  async placeOrder() {
    // Review 화면 전환이 끝날 때까지 대기 (화면 안정화)
    await this.waitForDisplayed(CHECKOUT.PLACE_ORDER_BTN);
    await this.clickWhenExists(CHECKOUT.PLACE_ORDER_BTN);
  }
  
}

module.exports = new CheckoutPage();