// 계정/배송/결제 데이터를 spec에서 분리. 값이 바뀌어도 테스트 로직은 그대로 둔다.

const ACCOUNTS = {
  valid: { username: 'bod@example.com', password: '10203040' },
  locked: { username: 'alice@example.com', password: '10203040' }, // 로그인 거부 케이스용
};

const SHIPPING = {
  valid: {
    fullName: 'John Doe',
    address: '123 Main St',
    city: 'Seoul',
    zip: '12345',
    country: 'Korea',
  },
};

const PAYMENT = {
  valid: {
    cardNumber: '1234567812345678',
    expiry: '12/25',
    securityCode: '123',
  },
};

module.exports = { ACCOUNTS, SHIPPING, PAYMENT };
