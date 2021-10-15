import { log } from '@kot-shrodingera-team/germes-utils';

const setBetAcceptMode = async (): Promise<void> => {
  log(
    'Внимание. Для БК Parimatch не реализовано переключение режима принятия ставок (изменение коэффициентов). Режим не будет изменён',
    'steelblue'
  );
};

export default setBetAcceptMode;
