import {
  comparePrimitiveArrays,
  log,
  text,
} from '@kot-shrodingera-team/germes-utils';
import { getReactInstance } from '@kot-shrodingera-team/germes-utils/reactUtils';

const findMarket = (
  eventId: string,
  marketType: number,
  period: number,
  resultKind: number
): HTMLElement => {
  const markets = [
    ...document.querySelectorAll<HTMLElement>(
      '[data-id^="market-expansion-panel-header-"]'
    ),
  ];

  return markets.find((market) => {
    const marketHeader = text(market);
    log(marketHeader, 'white', true);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const marketInstance = <any>getReactInstance(market);
    const marketData = marketInstance.return.memoizedProps.marketId;

    const compareData = [
      [eventId, marketData.eventId],
      [resultKind, marketData.resultKind],
      [marketType, marketData.marketType],
      [period, marketData.period],
    ];

    let equal = true;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const compare = (left: any, right: any) => {
      if (Array.isArray(left) && Array.isArray(right)) {
        return comparePrimitiveArrays(left, right);
      }
      return left === right;
    };

    compareData.forEach((v) => {
      // if (worker.Dev) {
      //   // eslint-disable-next-line no-console
      //   console.log(v[0], v[1], compare(v[0], v[1]));
      // }
      equal = equal ? compare(v[0], v[1]) : equal;
    });

    return equal;
  });
};

export default findMarket;
