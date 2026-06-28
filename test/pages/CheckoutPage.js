const BasePage = require('./BasePage');
const { CHECKOUT } = require('../constants/selectors');

/**
 * 결제(배송지 + 결제수단 + 주문) 화면 Page Object.
 */
class CheckoutPage extends BasePage {
  /**
   * 배송지 정보를 입력한다.
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
   * 결제 수단 정보를 입력한다.
   * @param {{cardNumber:string,expiry:string,securityCode:string}} info
   */
  async enterPaymentInfo({ cardNumber, expiry, securityCode }) {
    await this.scrollToElement(CHECKOUT.CARD_NUMBER);
    await this.setValue(CHECKOUT.CARD_NUMBER, cardNumber);
    await this.setValue(CHECKOUT.EXPIRY, expiry);
    await this.setValue(CHECKOUT.SECURITY_CODE, securityCode);
  }

  /** 결제 수단 입력 단계로 진행 */
  async goToPayment() {
    await this.scrollToElement(CHECKOUT.TO_PAYMENT_BTN);
    await this.click(CHECKOUT.TO_PAYMENT_BTN);
  }

  /** 주문 검토(최종 확정) */
  async reviewOrder() {
    await this.scrollToElement(CHECKOUT.REVIEW_BTN);
    await this.click(CHECKOUT.REVIEW_BTN);
  }

  async isShippingPageDisplayed() {
    return this.isDisplayed(CHECKOUT.SHIPPING_TITLE);
  }

  async isOrderComplete() {
    return this.isDisplayed(CHECKOUT.ORDER_COMPLETE);
  }
}

module.exports = new CheckoutPage();