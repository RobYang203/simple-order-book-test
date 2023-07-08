import { call, put, take } from 'redux-saga/effects';

export function* connectWSSaga(wsInfo, actionType, websocketChannel) {
  try {
    const channel = yield call(websocketChannel, wsInfo, actionType);

    while (true) {
      const action = yield take(channel);
      yield put(action);
    }
  } catch (error) {
    console.log(
      '🚀 ~ file: wsSaga.js:61 ~ function*connectOrderbookWSSaga ~ error:',
      error
    );
  }
}
