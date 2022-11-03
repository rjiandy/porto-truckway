
import { fork, take, cancel } from 'redux-saga/effects';

import offlineSaga from './offlineSaga';
import submissionOfflineSaga from './submissionOfflineSaga';

export default function* rootSaga() {
  while (true) {
    const offlineTask = yield fork(offlineSaga);
    const submissionOfflineTask = yield fork(submissionOfflineSaga);
    yield take('LOGOUT');
    yield cancel([offlineTask, submissionOfflineTask]);
    continue;
  }
}
