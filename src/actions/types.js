import createActionTypes from 'redux-create-actiontype';

export const syncActionTypes = createActionTypes()('');

export const asyncActionTypes = createActionTypes({
  apiPostfixes: ['success', 'error', 'processing'],
})(
  {
    GET_FOLLOWING_LIST: { api: true },
  },
  {
    GET_FOR_YOU_LIST: { api: true },
  }
);

const totalActionTypes = {
  ...syncActionTypes,
  ...asyncActionTypes,
};

export default totalActionTypes;
