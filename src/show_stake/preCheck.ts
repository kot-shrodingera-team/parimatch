import {
  // domLoaded,
  getElement,
  log,
  // sleep,
} from '@kot-shrodingera-team/germes-utils';
import JsFailError from './errors/jsFailError';
import NewUrlError from './errors/newUrlError';

const preCheck = async (): Promise<void> => {
  if (window.location.href.includes(worker.EventId)) {
    log('Открыто нужное событие', 'steelblue');
    const allButton = (await getElement(
      '[data-id="event-markets-tab-all"]'
    )) as HTMLElement;
    if (!allButton) {
      throw new JsFailError('Не найдена кнопка выбора всех маркетов');
    }
    allButton.click();
    log('Нажали кнопку "Все"', 'orange');
    const allButtonActive = await getElement(
      '.dPRmDXN5chphSRoNdjHlN[data-id="event-markets-tab-all"]'
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

    return;
  }
  window.location.href = worker.EventUrl;
  throw new NewUrlError('Переходим на нужное событие');
  // log('Проверяем открытый спорт', 'steelblue');
  // const sportIdToUrl = {
  //   1: '/ru/football/live',
  //   2: '/ru/tennis/live',
  //   3: '/ru/ice-hockey/live',
  //   4: '/ru/basketball/live',
  //   5: '/ru/volleyball/live',
  //   6: '/ru/handball/live',
  //   7: '/ru/table-tennis/live',
  //   8: '/ru/futsal/live',
  //   // 13: '', // Бадминтон
  //   16: '/ru/baseball/live',
  //   121: '/ru/e-sports/live',
  //   139: '/ru/football/live',
  //   140: '/ru/ice-hockey/live',
  //   141: '/ru/basketball/live',
  //   142: '/ru/tennis/live',
  //   143: '/ru/volleyball/live',
  // } as Record<number, string>;
  // if (!Object.prototype.hasOwnProperty.call(sportIdToUrl, worker.SportId)) {
  //   throw new JsFailError('Не удаётся определить спорт');
  // }
  // const targetSportButton = document.querySelector(
  //   `[href="${sportIdToUrl[worker.SportId]}"]`
  // ) as HTMLElement;
  // if (!targetSportButton) {
  //   throw new JsFailError('Не найдена кнопка перехода к нужному спорту');
  // }
  // if (targetSportButton.classList.contains('_9Vvz9WR5Y74pZOFX_Ijsd ')) {
  //   log('Уже открыт нужный спорт', 'steelblue');
  //   return;
  // }
  // log('Переходим на нужный спорт', 'orange');
  // targetSportButton.click();
  // const sportIdToAbbr = {
  //   1: 'F',
  //   2: 'T',
  //   3: 'H',
  //   4: 'B',
  //   5: 'VB',
  //   6: 'HB',
  //   7: 'TT',
  //   8: 'FZ',
  //   // 13: '', // Бадминтон
  //   16: 'BB',
  //   121: 'CS',
  //   139: 'F',
  //   140: 'H',
  //   141: 'B',
  //   142: 'T',
  //   143: 'VB',
  // } as Record<number, string>;
  // const anyLeagueSelector = `[data-id^="country-id-1|${sportIdToAbbr[worker.SportId]
  //   }|"], [data-id^="country-id-2|${sportIdToAbbr[worker.SportId]}|"]`;
  // log(`anyLeagueSelector: "${anyLeagueSelector}"`, 'white', true);
  // const anyLeague = await getElement(anyLeagueSelector);
  // if (!anyLeague) {
  //   throw new JsFailError('Не дождались перехода к нужному спорту');
  // }
  // log('Успешно перешли к нужному спорту', 'steelblue');
  // const eventLink = (await getElement(
  //   `[href*="${worker.EventId}"]`
  // )) as HTMLElement;
  // if (!eventLink) {
  //   throw new JsFailError('Не найдено нужное событие');
  // }
  // log('Переходим на нужное событие', 'orange');
  // eventLink.click();
  // await sleep(2000);
  // log('Подождали 2 секунды', 'steelblue');
};

export default preCheck;
