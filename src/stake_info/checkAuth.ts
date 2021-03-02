import checkAuthGenerator, {
  authStateReadyGenerator,
} from '@kot-shrodingera-team/germes-generators/stake_info/checkAuth';

export const authStateReady = authStateReadyGenerator({
  // noAuthElementSelector: '.head-section-login-wrapper > .btn-login',
  noAuthElementSelector: '[data-id="header-login"]',
  authElementSelector: '[data-id="header-user-box"]',
  // maxDelayAfterNoAuthElementAppeared: 0,
  // logging: true,
});

const checkAuth = checkAuthGenerator({
  authElementSelector: '[data-id="header-user-box"]',
});

export default checkAuth;
