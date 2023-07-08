import createActionTypes from 'redux-create-actiontype';

export const syncActionTypes = createActionTypes({ prefix: 'REFRESH' })(
  'ORDERBOOK',
  'LAST_PRICE'
);

export const wsActionTypes = createActionTypes({
  prefix: 'ws',
  apiPostfixes: ['command', 'info'],
})(
  {
    ORDERBOOK: { api: true },
  },
  {
    LAST_PRICE: { api: true },
  }
);

export const asyncActionTypes = createActionTypes({
  apiPostfixes: ['success', 'error', 'processing'],
})();

const totalActionTypes = {
  ...syncActionTypes,
  ...asyncActionTypes,
  ...wsActionTypes,
};

export default totalActionTypes;
