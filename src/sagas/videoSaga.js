import { call, put } from '@redux-saga/core/effects';
import types from 'actions/types';
import { getFollowingListResult, getForYouListResult } from 'apis/video';

const OKFollowList = (payload) => {
  return {
    type: types.GET_FOLLOWING_LIST_SUCCESS,
    payload,
  };
};

const ErrFollowList = () => {
  return {
    type: types.GET_FOLLOWING_LIST_ERROR,
  };
};

export function* getFollowingListSaga() {
  try {
    const { items } = yield call(getFollowingListResult);

    yield put(OKFollowList(items));
  } catch (error) {
    yield put(ErrFollowList());
  }
}

const OKForYouList = (payload) => {
  return {
    type: types.GET_FOR_YOU_LIST_SUCCESS,
    payload,
  };
};

const ErrForYouList = () => {
  return {
    type: types.GET_FOR_YOU_LIST_ERROR,
  };
};

export function* getForYouListSaga() {
  try {
    const { items } = yield call(getForYouListResult);

    yield put(OKForYouList(items));
  } catch (error) {
    yield put(ErrForYouList());
  }
}
