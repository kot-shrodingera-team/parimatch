import clearCouponGenerator from '@kot-shrodingera-team/germes-generators/show_stake/clearCoupon';
import getStakeCount from '../stake_info/getStakeCount';

// const preCheck = (): boolean => {
//   return false;
// };

// const apiClear = (): void => {};

// const postCheck = async (): Promise<boolean> => {
//   return true;
// };

const clearCoupon = clearCouponGenerator({
  // preCheck,
  getStakeCount,
  // apiClear,
  clearSingleSelector: '[data-id="betslip2-outcome-close-button"]',
  // clearAllSelector: '[data-id="betslip2-header-delete-button"]',
  // postCheck,
  // context: () => document,
});

export default clearCoupon;
