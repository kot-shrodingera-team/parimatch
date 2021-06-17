import authorizeGenerator from '@kot-shrodingera-team/germes-generators/initialization/authorize';
import { setReactInputValue } from '@kot-shrodingera-team/germes-utils/reactUtils';
import { updateBalance, balanceReady } from '../stake_info/getBalance';
// import afterSuccesfulLogin from './afterSuccesfulLogin';

// const setLoginType = async (): Promise<boolean> => {
//   return true;
// };

const beforeSubmitCheck = async (): Promise<boolean> => {
  const loginInput = document.querySelector('[name="phone"], [name="email"]');
  setReactInputValue(loginInput, '+');
  setReactInputValue(loginInput, worker.Login);
  return true;
};

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
  beforeSubmitCheck,
  // captchaSelector: '',
  loginedWait: {
    loginedSelector: '[data-id="header-user-box"]',
    // timeout: 5000,
    balanceReady,
    updateBalance,
    // afterSuccesfulLogin,
  },
  // context: () => document,
});

export default authorize;
