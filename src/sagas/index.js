import { fork, all } from "redux-saga/effects";
import * as Watchers from "./watchers";

export default function* sagaFormat() {
  const sagas = Object.values(Watchers).map((watcher) => fork(watcher));
  yield all(sagas);
}
