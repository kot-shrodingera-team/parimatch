import getCurrentSumGenerator from '@kot-shrodingera-team/germes-generators/stake_info/getCurrentSum';

const getCurrentSum = getCurrentSumGenerator({
  sumInput: '[data-id="betslip2-stake-input"]',
  // zeroValues: [],
  // currentSumRegex: /(\d+(?:\.\d+)?)/,
});

export default getCurrentSum;
