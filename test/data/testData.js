/**
 * 테스트 데이터를 코드(spec)에서 분리
 *
 * 이점 :
 * - 값이 바뀌어도 spec 로직은 변경되지 않음
 * - 동일 시나리오를 여러 데이터로 돌리는 data-driven 테스트가 쉬워짐
 * - 계정/카드 정보가 한 곳에 모여 관리가 쉬움
 */

const ACCOUNTS = {
  // 정상 로그인 계정
  valid: { username: 'bod@example.com', password: '10203040' },
  // 잠긴 계정 (로그인 실패)
  locked: { username: 'alice@example.com', password: '10203040' },
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
    cardNumber: '3258 1256 7568 7891',  // 공백 포함, placeholder와 동일 형식
    expiry: '03/25',
    securityCode: '123',
  },
};

module.exports = { ACCOUNTS, SHIPPING, PAYMENT };
