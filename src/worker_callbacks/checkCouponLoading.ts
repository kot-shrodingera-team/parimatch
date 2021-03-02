import checkCouponLoadingGenerator from '@kot-shrodingera-team/germes-generators/worker_callbacks/checkCouponLoading';
import { log } from '@kot-shrodingera-team/germes-utils';
import { getDoStakeTime } from '../stake_info/doStakeTime';

const check = () => {
  const loaderElement = document.querySelector(
    '[data-id="betslip2-place-bet-button"] > ._1f09ofd3UtPe8bcg_jOs4U'
  );
  const successElement = document.querySelector(
    '[data-id="betslip2-success-betslip-content"]'
  );

  if (loaderElement) {
    log('Обработка ставки (иконка)', 'tan');
    return true;
  }
  if (successElement) {
    log('Обработка ставки завершена (успешная ставка)', 'orange');
    return false;
  }
  if (!loaderElement) {
    log('Обработка ставки завершена (нет иконки)', 'orange');
    return false;
  }

  log('Обработка ставки (нет иконки)', 'tan');

  return true;
};

const checkCouponLoading = checkCouponLoadingGenerator({
  getDoStakeTime,
  bookmakerName: 'Parimatch',
  timeout: 50000,
  check,
});

export default checkCouponLoading;
