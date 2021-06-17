import checkCouponLoadingGenerator from '@kot-shrodingera-team/germes-generators/worker_callbacks/checkCouponLoading';
import {
  log,
  getElement,
  awaiter,
  getRemainingTimeout,
  checkCouponLoadingError,
  checkCouponLoadingSuccess,
  // text,
} from '@kot-shrodingera-team/germes-utils';
import { StateMachine } from '@kot-shrodingera-team/germes-utils/stateMachine';

const loaderSelector =
  '[data-id="betslip2-place-bet-button"] > ._1f09ofd3UtPe8bcg_jOs4U';
// const errorSelector = '';
const lockedSelector = '._3dh0pK0lts4xHLOPcbzkFL, .VvPzvS2sTu5dVBQJfXbbZ';
const betPlacedSelector = '[data-id="betslip2-success-betslip-content"]';

const asyncCheck = async () => {
  const machine = new StateMachine();

  machine.promises = {
    loader: () => getElement(loaderSelector, getRemainingTimeout()),
    // error: () => getElement(errorSelector, getRemainingTimeout()),
    locked: () => getElement(lockedSelector, getRemainingTimeout()),
    betPlaced: () => getElement(betPlacedSelector, getRemainingTimeout()),
  };

  machine.setStates({
    start: {
      entry: async () => {
        log('Начало обработки ставки', 'steelblue');
      },
    },
    loader: {
      entry: async () => {
        log('Появился индикатор', 'steelblue');
        window.germesData.betProcessingAdditionalInfo = 'индикатор';
        delete machine.promises.loader;
        machine.promises.loaderDissappeared = () =>
          awaiter(
            () => document.querySelector(loaderSelector) === null,
            getRemainingTimeout()
          );
      },
    },
    loaderDissappeared: {
      entry: async () => {
        log('Исчез индикатор', 'steelblue');
        window.germesData.betProcessingAdditionalInfo = null;
        delete machine.promises.loaderDissappeared;
      },
    },
    // error: {
    //   entry: async () => {
    //     log('Появилась ошибка', 'steelblue');
    //     window.germesData.betProcessingAdditionalInfo = null;
    //     const errorText = text(machine.data.result);
    //     log(errorText, 'tomato');
    //     worker.Helper.SendInformedMessage(errorText);
    //     checkCouponLoadingError({});
    //   },
    //   final: true,
    // },
    locked: {
      entry: async () => {
        log('Ставка недоступна', 'steelblue');
        window.germesData.betProcessingAdditionalInfo = null;
        checkCouponLoadingError({});
      },
      final: true,
    },
    betPlaced: {
      entry: async () => {
        window.germesData.betProcessingAdditionalInfo = null;
        checkCouponLoadingSuccess('Ставка принята');
      },
      final: true,
    },
    timeout: {
      entry: async () => {
        window.germesData.betProcessingAdditionalInfo = null;
        checkCouponLoadingError({
          botMessage: 'Не дождались результата ставки',
          informMessage: 'Не дождались результата ставки',
        });
      },
      final: true,
    },
  });

  machine.start('start');
};

const checkCouponLoading = checkCouponLoadingGenerator({
  asyncCheck,
});

export default checkCouponLoading;
