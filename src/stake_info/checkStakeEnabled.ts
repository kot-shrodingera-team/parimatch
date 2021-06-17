import checkStakeEnabledGenerator from '@kot-shrodingera-team/germes-generators/stake_info/checkStakeEnabled';
import getStakeCount from './getStakeCount';

// const preCheck = (): boolean => {
//   return true;
// };

const checkStakeEnabled = checkStakeEnabledGenerator({
  // preCheck,
  getStakeCount,
  // betCheck: {
  //   selector: '',
  //   errorClasses: [
  //     {
  //       className: '',
  //       message: '',
  //     },
  //   ],
  // },
  errorsCheck: [
    {
      selector: '._3dh0pK0lts4xHLOPcbzkFL, .VvPzvS2sTu5dVBQJfXbbZ',
      message: 'Исход удалён или остановлен приём',
    },
  ],
  // context: () => document,
});

export default checkStakeEnabled;
