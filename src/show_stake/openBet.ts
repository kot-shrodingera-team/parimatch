import { awaiter, log } from '@kot-shrodingera-team/germes-utils';
import { getReactInstance } from '@kot-shrodingera-team/germes-utils/reactUtils';
import getStakeCount from '../stake_info/getStakeCount';
import JsFailError from './errors/jsFailError';

const openBet = async (): Promise<void> => {
  const { outcomeId }: { outcomeId: string } = JSON.parse(worker.BetId);
  const headerWrapper = document.querySelector('[data-id="header-wrapper"]');
  const headerWrapperReactInstance = getReactInstance(headerWrapper) as {
    return: {
      memoizedProps: {
        dispatch: (data: Record<string, unknown>) => unknown;
      };
    };
  };

  log(`Ищем ставку: ${worker.BetName}`);
  log(outcomeId, 'white', true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const payload = {} as any;
  if (window.location.origin === 'https://www.parimatch.ru') {
    payload.outcomeId = outcomeId;
  } else {
    // 2|6084802|5|/1/1$1@120|2.5|5,[2.5],[1],1,4,[]
    // ?|eventId|marketType|layout?/period/resultKind$?@?|parameter|marketType,[values],[period],?,outcomeType,[outcomeValues]
    const outcomeRegex = /^2\|(?<eventId>\d+)\|(?<marketType>\d+)\|(?<layout>\d+)?\/(?<period>\d+)\/(?<resultKind>\d+)\$\d+@\d+\|(?:\d+(?:\.\d+)?)?\|\d+,\[(?<values>[^\]]*)],\[[^\]]*],\d+,(?<outcomeType>\d+),\[(?<outcomeValues>[^\]]*)]$/;
    const match = outcomeId.match(outcomeRegex);
    if (!match) {
      throw new JsFailError('Ошибка парсинга данных. Обратитесь в ТП');
    }
    const { groups } = match;
    payload.outcomeId = {};
    payload.outcomeId.eventId = groups.eventId;
    payload.outcomeId.resultKind = Number(groups.resultKind);
    payload.outcomeId.marketType = Number(groups.marketType);
    payload.outcomeId.period = Number(groups.period);
    if (groups.values) {
      payload.outcomeId.values = groups.values.split(',');
    } else {
      payload.outcomeId.values = [];
    }
    payload.outcomeId.outcomeType = Number(groups.outcomeType);
    if (groups.outcomeValues) {
      payload.outcomeId.outcomeValues = groups.outcomeValues.split(',');
    } else {
      payload.outcomeId.outcomeValues = [];
    }
    payload.data = {};
    if (groups.layout) {
      payload.data.layout = groups.layout;
    }
  }

  const data = {
    payload,
    type: '/outcomes/toggle_outcome',
  };
  log(JSON.stringify(data, null, 2), 'white', true);

  const maxTryCount = 5;
  for (let i = 1; i <= maxTryCount; i += 1) {
    log('Делаем запрос на открытие купона', 'orange');
    headerWrapperReactInstance.return.memoizedProps.dispatch(data);
    // eslint-disable-next-line no-await-in-loop
    const betAdded = await awaiter(() => getStakeCount() === 1, 1000, 50);

    if (!betAdded) {
      if (i === maxTryCount) {
        throw new JsFailError('Ставка так и не попала в купон');
      }
      log(`Ставка не попала в купон (попытка ${i})`, 'steelblue');
    } else {
      log('Ставка попала в купон', 'steelblue');
      break;
    }
  }
};

export default openBet;
