/* eslint-disable no-unused-vars */

const c1 = '2|6084733|2|/0/1$1@10||2,[],[0],1,0,[]';
const o1 = {
  outcomeId: {
    eventId: '6084733',
    resultKind: 1,
    marketType: 2,
    period: 0,
    values: [],
    outcomeType: 0,
    outcomeValues: [],
  },
  data: {},
};

const c2 = '2|6084733|2|/0/1$1@10||2,[],[0],1,1,[]';
const o2 = {
  outcomeId: {
    eventId: '6084733',
    resultKind: 1,
    marketType: 2,
    period: 0,
    values: [],
    outcomeType: 1,
    outcomeValues: [],
  },
  data: {},
};

const c3 = '2|6084733|3|/0/1$1@20||3,[],[0],1,8,[]';
const o3 = {
  outcomeId: {
    eventId: '6084733',
    resultKind: 1,
    marketType: 3,
    period: 0,
    values: [],
    outcomeType: 8,
    outcomeValues: [],
  },
  data: {},
};

const c4 = '2|6084733|4|/0/1$1@40|0|4,[0],[0],1,86,[]';
const o4 = {
  outcomeId: {
    eventId: '6084733',
    resultKind: 1,
    marketType: 4,
    period: 0,
    values: ['0'],
    outcomeType: 86,
    outcomeValues: [],
  },
  data: {},
};

// H1 (-1.5)
const c5 = '2|6084733|4|/0/1$1@40|-1.5|4,[-1.5],[0],1,86,[]';
const o5 = {
  outcomeId: {
    eventId: '6084733',
    resultKind: 1,
    marketType: 4,
    period: 0,
    values: ['-1.5'],
    outcomeType: 86,
    outcomeValues: [],
  },
  data: {},
};

// H2 (1.5)
const c6 = '2|6084733|4|/0/1$1@40|-1.5|4,[-1.5],[0],1,87,[]';
const o6 = {
  outcomeId: {
    eventId: '6084733',
    resultKind: 1,
    marketType: 4,
    period: 0,
    values: ['-1.5'],
    outcomeType: 87,
    outcomeValues: [],
  },
  data: {},
};

// H1 (1.5)
const c7 = '2|6084733|4|/0/1$1@40|1.5|4,[1.5],[0],1,86,[]';
const o7 = {
  outcomeId: {
    eventId: '6084733',
    resultKind: 1,
    marketType: 4,
    period: 0,
    values: ['1.5'],
    outcomeType: 86,
    outcomeValues: [],
  },
  data: {},
};

// H2 (-1.5)
const c8 = '2|6084733|4|/0/1$1@40|1.5|4,[1.5],[0],1,87,[]';
const o8 = {
  outcomeId: {
    eventId: '6084733',
    resultKind: 1,
    marketType: 4,
    period: 0,
    values: ['1.5'],
    outcomeType: 87,
    outcomeValues: [],
  },
  data: {},
};

// Total Over (2.5)
const c9 = '2|6084733|5|/0/1$1@50|2.5|5,[2.5],[0],1,4,[]';
const o9 = {
  outcomeId: {
    eventId: '6084733',
    resultKind: 1,
    marketType: 5,
    period: 0,
    values: ['2.5'],
    outcomeType: 4,
    outcomeValues: [],
  },
  data: {},
};

// Total Under (2.5)
const c10 = '2|6084733|5|/0/1$1@50|2.5|5,[2.5],[0],1,5,[]';
const o10 = {
  outcomeId: {
    eventId: '6084733',
    resultKind: 1,
    marketType: 5,
    period: 0,
    values: ['2.5'],
    outcomeType: 5,
    outcomeValues: [],
  },
  data: {},
};

// T1 Total Over (1.5)
const c11 = '2|6084733|7|1/0/1$1@60|1.5|7,[1,1.5],[0],1,37,[]';
const o11 = {
  outcomeId: {
    eventId: '6084733',
    resultKind: 1,
    marketType: 7,
    period: 0,
    values: ['1', '1.5'],
    outcomeType: 37,
    outcomeValues: [],
  },
  data: {
    layout: '1',
  },
};

// T2 Total Over (2.5)
const c12 = '2|6084733|7|2/0/1$1@60|2.5|7,[2,2.5],[0],1,37,[]';
const o12 = {
  outcomeId: {
    eventId: '6084733',
    resultKind: 1,
    marketType: 7,
    period: 0,
    values: ['2', '2.5'],
    outcomeType: 37,
    outcomeValues: [],
  },
  data: {
    layout: '2',
  },
};

// CS (1-2)
const c13 = '2|6084733|16|/0/1$1@280||16,[],[0],1,102,[1,2]';
const o13 = {
  outcomeId: {
    eventId: '6084733',
    resultKind: 1,
    marketType: 16,
    period: 0,
    values: [],
    outcomeType: 102,
    outcomeValues: ['1', '2'],
  },
  data: {},
};

// T1 Total Odd
const c14 = '2|6084733|105|1/0/1$0@0|1|105,[1],[0],1,7,[]';
const o14 = {
  outcomeId: {
    eventId: '6084733',
    resultKind: 1,
    marketType: 105,
    period: 0,
    values: ['1'],
    outcomeType: 7,
    outcomeValues: [],
  },
  data: {
    layout: '1',
  },
};

// Total Over (1 half) (2.5)
const c15 = '2|6084802|5|/1/1$1@120|2.5|5,[2.5],[1],1,4,[]';
const o15 = {
  outcomeId: {
    eventId: '6084802',
    resultKind: 1,
    marketType: 5,
    period: 1,
    values: ['2.5'],
    outcomeType: 4,
    outcomeValues: [],
  },
  data: {},
};

// Win 1 (3 quarter)
const c16 = '2|6107002|2|/3/1$0@210||2,[],[3],1,0,[]';
const o16 = {
  outcomeId: {
    eventId: '6107002',
    resultKind: 1,
    marketType: 2,
    period: 3,
    values: [],
    outcomeType: 0,
    outcomeValues: [],
  },
  data: {},
};

// ?|eventId|marketType|layout?/period/resultKind$?@?|parameter|marketType,[values],[period],?,outcomeType,[outcomeValues]
// 2|eventId|marketType|layout?/period/resultKind$?@?|parameter|marketType,[values],[period],1,outcomeType,[outcomeValues]
