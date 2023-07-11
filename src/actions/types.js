import createActionTypes from 'redux-create-actiontype';

export const syncActionTypes = createActionTypes({ prefix: 'TRANSFORM' })(
  'QUOTES',
  'LAST_PRICE'
);

export const wsActionTypes = createActionTypes({
  prefix: 'WS',
  apiPostfixes: ['COMMAND', 'INFO'],
})(
  {
    QUOTES: { api: true },
  },
  {
    LAST_PRICE: { api: true },
  }
);

export const asyncActionTypes = createActionTypes({
  apiPostfixes: ['SUCCESS', 'ERROR', 'PROCESSING'],
})(
  {
    QUOTES: { api: true },
  },
  {
    LAST_PRICE: { api: true },
  }
);

const totalActionTypes = {
  ...syncActionTypes,
  ...asyncActionTypes,
  ...wsActionTypes,
};

export default totalActionTypes;
