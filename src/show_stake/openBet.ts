import {
  awaiter,
  getElement,
  log,
  repeatingOpenBet,
  text,
} from '@kot-shrodingera-team/germes-utils';
import { JsFailError } from '@kot-shrodingera-team/germes-utils/errors';
import expandMarket from '../helpers/expandMarket';
import findMarket from '../helpers/findMarket';
import findOutcome from '../helpers/findOutcome';
import { coefficientReady } from '../stake_info/getCoefficient';
import getStakeCount from '../stake_info/getStakeCount';
import clearCoupon from './clearCoupon';

const openBet = async (): Promise<void> => {
  /* ======================================================================== */
  /*                              Очистка купона                              */
  /* ======================================================================== */

  const couponCleared = await clearCoupon();
  if (!couponCleared) {
    throw new JsFailError('Не удалось очистить купон');
  }
  console.log(document.querySelector('._2IhWyc1X2jIjSb6LZqIvU9').outerHTML);

  /* ======================================================================== */
  /*                      Формирование данных для поиска                      */
  /* ======================================================================== */

  const {
    resultKind,
    marketType,
    period,
    outcomeParameters,
    outcomeType,
    marketParameters,
    market_name: betIdMarketName,
    outcome_name: betIdOutcomeName,
  } = JSON.parse(worker.BetId);

  log(`Ищем маркет ${betIdMarketName}`, 'steelblue');
  const market = findMarket(worker.EventId, marketType, period, resultKind);
  if (!market) {
    throw new JsFailError('Маркет не найден');
  }

  expandMarket(market);

  log(`Ищем исход ${betIdOutcomeName}`, 'steelblue');
  const outcome = findOutcome(
    market,
    outcomeType,
    outcomeParameters,
    marketParameters
  );
  if (!outcome) {
    throw new JsFailError('Исход не найден');
  }

  // const { outcomeId }: { outcomeId: string } = JSON.parse(worker.BetId);
  // log(`outcomeId = ${outcomeId}`, 'white', true);
  // // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const payload = {} as any;
  // // if (window.location.origin === 'https://www.parimatch.ru') {
  // //   payload.outcomeId = outcomeId;
  // // } else {
  // // 2|6084802|5|/1/1$1@120|2.5|5,[2.5],[1],1,4,[]
  // // ?|eventId|marketType|layout?/period/resultKind$?@?|parameter|marketType,[values],[period],?,outcomeType,[outcomeValues]
  // const outcomeRegex =
  //   /^2\|(?<eventId>\d+)\|(?<marketType>\d+)\|(?<layout>\d+)?\/(?<period>\d+)\/(?<resultKind>\d+)\$\d+@\d+\|(?:\d+(?:\.\d+)?)?\|\d+,\[(?<values>[^\]]*)],\[[^\]]*],\d+,(?<outcomeType>\d+),\[(?<outcomeValues>[^\]]*)]$/;
  // const match = outcomeId.match(outcomeRegex);
  // if (!match) {
  //   throw new JsFailError('Ошибка парсинга данных. Обратитесь в ТП');
  // }
  // const { groups } = match;
  // payload.outcomeId = {};
  // payload.outcomeId.eventId = groups.eventId;
  // payload.outcomeId.resultKind = Number(groups.resultKind);
  // payload.outcomeId.marketType = Number(groups.marketType);
  // payload.outcomeId.period = Number(groups.period);
  // if (groups.values) {
  //   payload.outcomeId.values = groups.values.split(',');
  // } else {
  //   payload.outcomeId.values = [];
  // }
  // payload.outcomeId.outcomeType = Number(groups.outcomeType);
  // if (groups.outcomeValues) {
  //   payload.outcomeId.outcomeValues = groups.outcomeValues.split(',');
  // } else {
  //   payload.outcomeId.outcomeValues = [];
  // }
  // payload.data = {};
  // if (groups.layout) {
  //   payload.data.layout = groups.layout;
  // }
  // // }
  // const emptyArray = (array: unknown[]) => {
  //   return Array.isArray(array) && array.length === 1 && array[0] === '';
  // };
  // const data = {
  //   payload: {
  //     data: {
  //       layout: undefined as unknown,
  //     },
  //     metadata: undefined as unknown,
  //     outcomeId: {
  //       eventId: worker.EventId,
  //       resultKind,
  //       marketType,
  //       period,
  //       // values: emptyArray(values) ? ([] as unknown[]) : values,
  //       values,
  //       outcomeType,
  //       // outcomeValues: emptyArray(outcomeValues)
  //       //   ? ([] as unknown[])
  //       //   : outcomeValues,
  //       outcomeValues,
  //     },
  //   },
  //   type: '/outcomes/toggle_outcome',
  // };
  // log(JSON.stringify(data, null, 2), 'white', true);

  /* ======================================================================== */
  /*                           Получение диспатчера                           */
  /* ======================================================================== */

  // const headerWrapper = document.querySelector('[data-id="header-wrapper"]');
  // const headerWrapperReactInstance = getReactInstance(headerWrapper) as {
  //   return: {
  //     memoizedProps: {
  //       dispatch: (data: Record<string, unknown>) => unknown;
  //     };
  //   };
  // };
  // if (
  //   !headerWrapperReactInstance ||
  //   !headerWrapperReactInstance.return ||
  //   !headerWrapperReactInstance.return.memoizedProps ||
  //   !headerWrapperReactInstance.return.memoizedProps.dispatch
  // ) {
  //   throw new JsFailError('Не найден диспатчер');
  // }
  // const dispatch = headerWrapperReactInstance.return.memoizedProps.dispatch;

  /* ======================================================================== */
  /*           Открытие ставки, проверка, что ставка попала в купон           */
  /* ======================================================================== */

  const openingAction = async () => {
    // dispatch(data);
    outcome.click();
  };
  await repeatingOpenBet(openingAction, getStakeCount, 5, 1000, 50);

  /* ======================================================================== */
  /*                  Ожидание, пока ставка станет доступной                  */
  /* ======================================================================== */

  // Селектор ставки, без класса недоступности ставки
  const enabledBetSelector =
    '.MF9pNgHHYHrCoYEiRXAArACM:not(.sYQCRt9kLlig_vtFxkTpQQC4)';
  const enabledBet = await getElement(enabledBetSelector);
  if (!enabledBet) {
    throw new JsFailError('Ставка не стала доступной');
  }
  log('Ставка доступна', 'cadetblue', true);

  const isCoefficientReady = await coefficientReady();
  if (!isCoefficientReady) {
    throw new JsFailError('Коэффициент не появился');
  }
  log('Коэффициент появился', 'cadetblue', true);

  const outcomeNameAppeared = await awaiter(() => {
    const outcomeNameElement = document.querySelector(
      '[data-id="betslip2-outcome"]'
    );
    if (outcomeNameElement) {
      const outcomeNameElementText = text(outcomeNameElement);
      return outcomeNameElementText !== '—';
    }
    return false;
  });
  if (!outcomeNameAppeared) {
    throw new JsFailError('Исход не появился в купоне');
  }

  const eventNameAppeared = await awaiter(() => {
    const eventNameElement = document.querySelector(
      '[data-id="betslip2-outcome-event-name"]'
    );
    if (eventNameElement) {
      const eventNameElementText = text(eventNameElement);
      return eventNameElementText !== '';
    }
    return false;
  });
  if (!eventNameAppeared) {
    throw new JsFailError('Исход не появился в купоне');
  }

  /* ======================================================================== */
  /*                    Вывод информации об открытой ставке                   */
  /* ======================================================================== */

  const eventNameSelector = '[data-id="betslip2-outcome-event-name"]';
  const marketNameSelector = '[data-id="betslip2-outcome-market-name"]';
  const betNameSelector = '[data-id="betslip2-outcome"]';

  const eventNameElement = document.querySelector(eventNameSelector);
  const marketNameElement = document.querySelector(marketNameSelector);
  const betNameElement = document.querySelector(betNameSelector);

  if (!eventNameElement) {
    throw new JsFailError('Не найдено событие открытой ставки');
  }
  if (!marketNameElement) {
    throw new JsFailError('Не найден маркет открытой ставки');
  }
  if (!betNameElement) {
    throw new JsFailError('Не найдена роспись открытой ставки');
  }

  const eventName = text(eventNameElement);
  const marketName = text(marketNameElement);
  const betName = text(betNameElement);

  log(`Открыта ставка\n${eventName}\n${marketName}\n${betName}`, 'steelblue');
};

export default openBet;
