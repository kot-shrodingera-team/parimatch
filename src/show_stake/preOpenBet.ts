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
  // console.log(document.querySelectorAll('._6JPDLIQ-y9WxCN-M_AP3W'));
  // await getElement('._6JPDLIQ-y9WxCN-M_AP3W'); // Что-то ожидалось. Таблица ставок?

  // const observerConfig = { childList: true, subtree: true, attributes: true };

  // const mutationObserver = new MutationObserver((mutations) => {
  //   console.warn(mutations);
  // });

  // mutationObserver.observe(document, observerConfig);
  // log('подключили observer', 'steelblue');
  // window.observer = mutationObserver;
};

export default preOpenBet;
