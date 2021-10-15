import authorizeGenerator from '@kot-shrodingera-team/germes-generators/initialization/authorize';
import {
  getElement,
  log,
  resolveRecaptcha,
  sleep,
} from '@kot-shrodingera-team/germes-utils';
import { authElementSelector } from '../stake_info/checkAuth';
import { updateBalance, balanceReady } from '../stake_info/getBalance';
// import afterSuccesfulLogin from './afterSuccesfulLogin';

// const preInputCheck = async (): Promise<boolean> => {
//   return true;
// };

// const beforeSubmitCheck = async (): Promise<boolean> => {
//   // const recaptchaIFrame = await getElement('iframe[title="reCAPTCHA"]', 1000);
//   // if (recaptchaIFrame) {
//   //   log('Есть капча. Пытаемся решить', 'orange');
//   //   try {
//   //     await resolveRecaptcha();
//   //   } catch (e) {
//   //     if (e instanceof Error) {
//   //       log(e.message, 'red');
//   //     }
//   //     return false;
//   //   }
//   // } else {
//   //   log('Нет капчи', 'steelblue');
//   // }
//   return true;
// };

const afterSubmitCheck = async (): Promise<boolean> => {
  const captchaFrameSelector = 'iframe[src*="captcha"]';
  await Promise.race([
    getElement(authElementSelector),
    getElement(captchaFrameSelector),
  ]);
  const captchaFrame =
    document.querySelector<HTMLIFrameElement>(captchaFrameSelector);
  if (captchaFrame) {
    log('Есть капча', 'steelblue');
    await sleep(5000);
    log('Пытаемся решить', 'orange');
    try {
      await resolveRecaptcha(
        document.querySelector<HTMLIFrameElement>(captchaFrameSelector)
          .contentWindow
      );
    } catch (e) {
      if (e instanceof Error) {
        log(e.message, 'red');
      }
      return false;
    }
  }
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
  // preInputCheck,
  loginInputSelector: '[name="id"], [name="phone"], [name="email"]',
  passwordInputSelector: '[name="password"]',
  submitButtonSelector: '[data-id="login-button"]',
  inputType: 'react',
  // fireEventNames: ['input'],
  // beforeSubmitDelay: 0,
  beforeSubmitDelay: 0,
  // beforeSubmitCheck,
  afterSubmitCheck,
  loginedWait: {
    loginedSelector: authElementSelector,
    // timeout: 5000,
    balanceReady,
    updateBalance,
    // afterSuccesfulLogin,
  },
  // context: () => document,
});

export default authorize;
