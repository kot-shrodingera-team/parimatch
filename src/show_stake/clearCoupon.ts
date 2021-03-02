import clearCouponGenerator from '@kot-shrodingera-team/germes-generators/show_stake/clearCoupon';
import getStakeCount from '../stake_info/getStakeCount';
// import getMaximumStake from '../stake_info/getMaximumStake';

// const preCheck = (): boolean => {
//   return false;
// };

// const apiClear = (): void => {};

const clearCoupon = clearCouponGenerator({
  // preCheck,
  getStakeCount,
  // apiClear,
  clearSingleSelector: '[data-id="betslip2-outcome-close-button"]',
  clearAllSelector: '[data-id="betslip2-header-delete-button"]',
  clearMode: 'one-only',
  // maxUnload: {
  //   getMaximumStake,
  // },
});

export default clearCoupon;
