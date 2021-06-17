import getStakeCountGenerator from '@kot-shrodingera-team/germes-generators/stake_info/getStakeCount';

const getStakeCount = getStakeCountGenerator({
  stakeSelector: '[data-id="betslip2-outcome-block"]',
  // context: () => document,
});

export default getStakeCount;
