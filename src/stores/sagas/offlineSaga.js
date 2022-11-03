import {
  takeLatest,
  select,
  put
} from 'redux-saga/effects';

function* offlineSaga(action) {
  const { payload, imageData } = action;
  const { mainQueue } = yield select((state) => state.submitStore);

  const sortedQueue = mainQueue.sort((a, b) => new Date(b.dateSubmit) - new Date(a.dateSubmit));
  let newQueue = [];
  if (sortedQueue.length >= 50) {
    newQueue = [...sortedQueue.slice(0, sortedQueue.length - 1)];
  } else {
    newQueue = [...sortedQueue];
  }

  const combinedData = {
    dateSubmit: new Date(),
    submissionData: {
      payload,
      imageData
    },
    key: payload.shiptoparty_code, // LATER ADD PICKUP AS FLAG
    status: '',
    error: ''
  };

  const found = newQueue.find((data) => data.key === combinedData.key);
  if (found) {
    const filtered = newQueue.filter((data) => data.key !== combinedData.key);
    newQueue = [...filtered, { ...combinedData, status: 'PENDING' }];
  } else {
    newQueue.push({ ...combinedData, status: 'PENDING' });
  }

  const reConstructedQueue = changeQueueFailed(newQueue);

  yield put({
    type: 'UPDATE_QUEUE',
    queue: reConstructedQueue
  });
  yield put({
    type: 'START_QUEUE'
  });

}

// HELPER
function changeQueueFailed(queue) {
  const newQueue = queue.map(data => {
    if (data.status === 'FAILED') {
      return {
        ...data,
        status: 'PENDING',
        error: ''
      };
    } else {
      return data;
    }
  });
  return newQueue;
}

function* networkChangeSaga(action) {
  const { mainQueue } = yield select((state) => state.submitStore);
  if (mainQueue.length > 0) {
    if (action.isConnected) {
      const newQueue = changeQueueFailed(mainQueue);
      yield put({
        type: 'UPDATE_QUEUE',
        queue: newQueue
      });
      yield put({
        type: 'START_QUEUE'
      });
    }
  }
}

function* rehydrate(action) {
  const { mainQueue } = yield select((state) => state.submitStore);
  if (mainQueue.length > 0) {
    const newQueue = changeQueueFailed(mainQueue);
    yield put({
      type: 'UPDATE_QUEUE',
      queue: newQueue
    });
    yield put({
      type: 'START_QUEUE'
    });
  }
}

function* retrySaga(action) {
  const { key } = action;
  const { mainQueue } = yield select((state) => state.submitStore);

  yield put({
    type: 'UPDATE_QUEUE',
    queue: mainQueue.map((data) => {
      if (data.key === key) {
        return {
          ...data,
          status: 'PENDING',
          error: ''
        };
      } else {
        return data;
      }
    })
  });
  yield put({ type: 'START_QUEUE' });
}

export default function* offlineSagaWatcher() {
  yield [
    yield takeLatest('SUBMIT_DO_REQUEST', offlineSaga),
    yield takeLatest('NETWORK_CHANGED', networkChangeSaga),
    yield takeLatest('RETRY_SUBMIT', retrySaga),
    yield takeLatest('REHYDRATE', rehydrate)
  ];
}
