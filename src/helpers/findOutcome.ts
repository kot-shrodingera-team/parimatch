import { comparePrimitiveArrays } from '@kot-shrodingera-team/germes-utils';
import { getReactInstance } from '@kot-shrodingera-team/germes-utils/reactUtils';

const findOutcome = (
  market: HTMLElement,
  outcomeType: number,
  outcomeParameters: string[],
  marketParameters: string[]
): HTMLElement => {
  const outcomes = [
    ...market.parentElement.nextElementSibling.querySelectorAll<HTMLElement>(
      '[data-id="outcome"]'
    ),
  ];

  return outcomes.find((outcome) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const outcomeInstance = <any>getReactInstance(outcome);
    const outcomeData =
      outcomeInstance.return.memoizedState.next.memoizedState[0];

    const compareData = [
      [outcomeType, outcomeData.id.type],
      [outcomeParameters, outcomeData.id.values],
      [marketParameters, outcomeData.outcomeGroupId.marketParameters],
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
      if (worker.Dev) {
        // eslint-disable-next-line no-console
        console.log(v[0], v[1], compare(v[0], v[1]));
      }
      equal = equal ? compare(v[0], v[1]) : equal;
    });

    return equal;
  });
};

export default findOutcome;
