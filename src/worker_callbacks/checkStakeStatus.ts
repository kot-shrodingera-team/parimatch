import { log } from "@kot-shrodingera-team/germes-utils";

const checkStakeStatus = (): boolean => {
  const successElement = document.querySelector(
    '[data-id="betslip2-success-betslip-content"]'
  );
  if (successElement) {
    log('Ставка принята', 'green');
    return true;
  }

  log('Ставка не принята', 'red');
  return false;
};

export default checkStakeStatus;
