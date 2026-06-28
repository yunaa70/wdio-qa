const BasePage = require('./BasePage');
const { CHECKOUT } = require('../constants/selectors');

class CheckoutPage extends BasePage {
  async enterShippingInfo({ fullName, address, city, zip, country }) {
    await this.scrollToElement(CHECKOUT.FULL_NAME);
    await this.setValue(CHECKOUT.FULL_NAME, fullName);
    await this.setValue(CHECKOUT.ADDRESS, address);
    await this.setValue(CHECKOUT.CITY, city);
    await this.setValue(CHECKOUT.ZIP, zip);
    await this.scrollToElement(CHECKOUT.COUNTRY);
    await this.setValue(CHECKOUT.COUNTRY, country);
  }

  async enterPaymentInfo({ cardNumber, expiry, securityCode }) {
    await this.scrollToElement(CHECKOUT.CARD_NUMBER);
    await this.setValue(CHECKOUT.CARD_NUMBER, cardNumber);
    await this.setValue(CHECKOUT.EXPIRY, expiry);
    await this.setValue(CHECKOUT.SECURITY_CODE, securityCode);
  }

  async goToPayment() {
    await this.scrollToElement(CHECKOUT.TO_PAYMENT_BTN);
    await this.click(CHECKOUT.TO_PAYMENT_BTN);
  }

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