import { log } from '@kot-shrodingera-team/germes-utils';

const expandMarket = (market: HTMLElement): void => {
  if (!market.parentElement.nextElementSibling) {
    log('Разворачиваем маркет', 'darksalmon');
    market.click();
  }
};

export default expandMarket;
