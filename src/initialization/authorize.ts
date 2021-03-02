import authorizeGenerator from '@kot-shrodingera-team/germes-generators/initialization/authorize';
import { updateBalance, balanceReady } from '../stake_info/getBalance';
// import afterSuccesfulLogin from './afterSuccesfulLogin';

// const setLoginType = async (): Promise<boolean> => {
//   return true;
// };

const authorize = authorizeGenerator({
  openForm: {
    selector: '[data-id="header-login"]',
    openedSelector: '[data-id="heading-bar"]',
    // loopCount: 10,
    // triesInterval: 1000,
    // afterOpenDelay: 0,
  },
  // setLoginType,
  loginInputSelector: '[name="phone"], [name="email"]',
  passwordInputSelector: '[name="password"]',
  submitButtonSelector: '[data-id="login-button"]',
  inputType: 'react',
  // fireEventNames: ['input'],
  // beforeSubmitDelay: 0,
  // captchaSelector: '',
  loginedWait: {
    loginedSelector: '[data-id="header-user-box"]',
    balanceReady,
    updateBalance,
  },
  // afterSuccesfulLogin,
});

export default authorize;
