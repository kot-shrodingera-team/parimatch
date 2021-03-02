import { log } from '@kot-shrodingera-team/germes-utils';

const getParameter = (): number => {
  const betNameElement = document.querySelector('[data-id="betslip2-outcome"]');
  if (!betNameElement) {
    log('Не найдена роспись ставки', 'crimson');
    return -9999;
  }

  const betName = betNameElement.textContent.trim();
  const parameterRegex = /\s(?:([+-]?\d+(?:\.\d+)?)|\(([+-]?\d+(?:\.\d+)?)\))$/;
  const parameterMatch = betName.match(parameterRegex);
  if (parameterMatch) {
    return Number(parameterMatch[1]);
  }
  return -6666;
};

export default getParameter;
