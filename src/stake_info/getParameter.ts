import {
  getWorkerParameter,
  log,
  text,
} from '@kot-shrodingera-team/germes-utils';

const getParameter = (): number => {
  if (
    getWorkerParameter('fakeParameter') ||
    getWorkerParameter('fakeOpenStake')
  ) {
    const parameter = Number(JSON.parse(worker.ForkObj).param);
    if (Number.isNaN(parameter)) {
      return -6666;
    }
    return parameter;
  }

  // const marketNameSelector = '';
  const betNameSelector = '[data-id="betslip2-outcome"]';

  // const marketNameElement = document.querySelector(marketNameSelector);
  const betNameElement = document.querySelector(betNameSelector);

  // if (!marketNameElement) {
  //   log('Не найден маркет ставки', 'crimson');
  //   return -9999;
  // }
  if (!betNameElement) {
    log('Не найдена роспись ставки', 'crimson');
    return -9999;
  }

  // const marketName = text(marketNameElement);
  const betName = text(betNameElement);

  // if (marketName === 'Draw No Bet') {
  //   return 0;
  // }

  const parameterRegex = /(?:([+-]?\d+(?:\.\d+)?)|\(([+-]?\d+(?:\.\d+)?)\))$/;
  const parameterMatch = betName.match(parameterRegex);
  if (parameterMatch) {
    if (parameterMatch[1] !== undefined) {
      return Number(parameterMatch[1]);
    }
    return Number(parameterMatch[2]);
  }
  return -6666;
};

export default getParameter;
