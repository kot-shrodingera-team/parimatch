import getStakeInfoValueGenerator, {
  stakeInfoValueReadyGenerator,
} from '@kot-shrodingera-team/germes-generators/stake_info/getStakeInfoValue';
import { StakeInfoValueOptions } from '@kot-shrodingera-team/germes-generators/stake_info/types';

export const balanceSelector = '[data-id="user-box-balance"]';

const balanceOptions: StakeInfoValueOptions = {
  name: 'balance',
  // fixedValue: () => 0,
  valueFromText: {
    text: {
      // getText: () => '',
      selector: balanceSelector,
      context: () => document,
    },
    replaceDataArray: [
      {
        searchValue: '',
        replaceValue: '',
      },
    ],
    removeRegex: /[\s,']/g,
    matchRegex: /(\d+(?:\.\d+)?)/,
    errorValue: 0,
  },
  zeroValues: [],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  modifyValue: (value: number, extractType: string) => value,
  disableLog: false,
};

const getBalance = getStakeInfoValueGenerator(balanceOptions);

export const balanceReady = stakeInfoValueReadyGenerator(balanceOptions);

export const updateBalance = (): void => {
  worker.JSBalanceChange(getBalance());
};

export default getBalance;
