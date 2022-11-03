import {
  takeLatest,
  select,
  put,
  retry
} from 'redux-saga/effects';

import submitDoApi, { uploadFileBase64 } from '../../api/submitApi';

async function submitAPI({ submissionData }) {
  const { payload, imageData } = submissionData;
  try {
    if (imageData) {
      const base64File = await uploadFileBase64({
        base64image: imageData,
        folder_path: 'esign'
      });
      if (base64File.status === 200) {
        const result = await submitDoApi({
          ...payload,
          e_sign: base64File.data.url
        });
        if (result.success) {
          return result;
        } else {
          throw result;
        }
      } else {
        throw base64File;
      }
    } else {
      const result = await submitDoApi({
        ...payload,
        e_sign: ''
      });
      if (result.success) {
        return result;
      } else {
        throw result;
      }
    }
  } catch (error) {
    throw error;
  }
}
// HELPER BEGIN
function processPendingList(list) {
  if (list.length > 0) {
    if (list.length > 1) {
      return [
        {
          ...list[0],
          status: 'IN_PROGRESS'
        },
        ...list.slice(1, list.length)
      ];
    } else {
      return [
        {
          ...list[0],
          status: 'IN_PROGRESS'
        }
      ];
    }
  } else {
    return [];
  }
}
// HELPER END

function* submissionOfflineSaga() {
  const { mainQueue } = yield select((state) => state.submitStore);
  let reConstructedQueue = [];

  const doneList = mainQueue.filter((data) => data.status === 'SUCCESS');
  const pendingList = mainQueue.filter((data) => data.status === 'PENDING');
  const failedList = mainQueue.filter((data) => data.status === 'FAILED');
  const submitList = mainQueue.filter((data) => data.status === 'IN_PROGRESS');

  if (submitList.length >= 1) {
    if (submitList.length > 1) {
      console.log('SUBMITTED DATA IN PROGRESS IS MORE THAN ONE, BUGGY!');
    }

    reConstructedQueue = [...submitList, ...pendingList, ...failedList, ...doneList];
  } else {
    if (pendingList.length > 0) {
      reConstructedQueue = [...processPendingList(pendingList), ...failedList, ...doneList];
    } else {
      reConstructedQueue = mainQueue;
    }
  }

  yield put({
    type: 'UPDATE_QUEUE',
    queue: reConstructedQueue
  });

  const inProgressData = reConstructedQueue.find((data) => data.status === 'IN_PROGRESS');

  let errMessage = '';
  let isSuccess = false;

  if (inProgressData) {
    try {
      const result = yield retry(5, 1000, submitAPI, inProgressData);
      if (result.success) {
        isSuccess = true;
      }
    } catch (error) {
      errMessage = error.message;
    }
    yield put({
      type: isSuccess ? 'SUBMIT_SUCCESS' : 'SUBMIT_FAILED',
      key: inProgressData.key,
      errorMessage: errMessage
    });
    yield put({
      type: 'START_QUEUE'
    });
  }
}

export default function* submissionOfflineWatcher() {
  yield [
    yield takeLatest('START_QUEUE', submissionOfflineSaga)
  ];
}
