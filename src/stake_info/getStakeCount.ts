import getStakeCountGenerator from '@kot-shrodingera-team/germes-generators/stake_info/getStakeCount';

const getStakeCount = getStakeCountGenerator({
  stakeElementSelector: '[data-id="betslip2-outcome-block"]',
});

export default getStakeCount;
