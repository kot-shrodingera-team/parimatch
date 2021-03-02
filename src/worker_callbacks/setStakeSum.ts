import setStakeSumGenerator from '@kot-shrodingera-team/germes-generators/worker_callbacks/setStakeSum';

// const preInputCheck = (sum: number): boolean => {
//   return true;
// };

const setStakeSum = setStakeSumGenerator({
  sumInputSelector: '[data-id="betslip2-stake-input"]',
  alreadySetCheck: {
    falseOnSumChange: false,
  },
  inputType: 'react',
  // fireEventName: 'input',
  // preInputCheck,
});

export default setStakeSum;
