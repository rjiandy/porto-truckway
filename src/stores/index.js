import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './sagas';

import rootReducer from './reducers';

const sagaMiddleware = createSagaMiddleware();

const middleware = composeWithDevTools(applyMiddleware(promise, thunk, sagaMiddleware));

const store = createStore(rootReducer, middleware);

sagaMiddleware.run(rootSaga);

export default store;
