import { getElement, log } from '@kot-shrodingera-team/germes-utils';
import { JsFailError } from '@kot-shrodingera-team/germes-utils/errors';

const preOpenBet = async (): Promise<void> => {
  /* ======================================================================== */
  /*                   Переключение на вкладку всех маркетов                  */
  /* ======================================================================== */

  const allButton = await getElement<HTMLElement>(
    '[data-id="event-markets-tab-all"]'
  );
  if (!allButton) {
    throw new JsFailError('Не найдена кнопка выбора всех маркетов');
  }
  allButton.click();
  log('Нажали кнопку "Все"', 'orange');
  const allButtonActive = await getElement(
    '.dPRmDXN5chphSRoNdjHlN[data-id="event-markets-tab-all"], ._1KVg07mpnY7ldox993_W6Q[data-id="event-markets-tab-all"]'
  );
  if (!allButtonActive) {
    throw new JsFailError('Не переключилась кнопка выбора всех маркетов');
  }
  log('Переключилось', 'steelblue');

  /* ========================================================================== */
  /*                           Ожидаем загрузки купона                          */
  /* ========================================================================== */

  await getElement(
    '[data-id="empty-betslip-wrapper"], [data-id="betslip2-outcome-block"]'
  );
  if (document.querySelector('[data-id="empty-betslip-wrapper"]')) {
    log('Дождались появления пустого купона', 'cadetblue', true);
  } else if (document.querySelector('[data-id="betslip2-outcome-block"]')) {
    log('Дождались появления ставки в купоне', 'cadetblue', true);
  } else {
    throw new JsFailError('Не дождались появления купона');
  }
  console.log(document.querySelector('._2IhWyc1X2jIjSb6LZqIvU9').outerHTML);
};

export default preOpenBet;
