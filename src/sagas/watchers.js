import types from 'actions/types';
import { takeLatest } from 'redux-saga/effects';
import { getFollowingListSaga, getForYouListSaga } from './videoSaga';

export function* watchGetFollowingListSaga() {
  yield takeLatest(types.GET_FOLLOWING_LIST_PROCESSING, getFollowingListSaga);
}

export function* watchGetForYouListSaga() {
  yield takeLatest(types.GET_FOR_YOU_LIST_PROCESSING, getForYouListSaga);
}
