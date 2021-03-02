import getCoefficientGenerator from '@kot-shrodingera-team/germes-generators/stake_info/getCoefficient';

const getCoefficient = getCoefficientGenerator({
  coefficientSelector:
    '[data-id="betslip2-outcome-block"] [data-id="animated-odds-value"]',
});

export default getCoefficient;
