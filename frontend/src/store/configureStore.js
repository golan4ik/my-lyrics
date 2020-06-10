import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();
const middleWares = applyMiddleware(sagaMiddleware);
const composedEnhancers = compose(
  middleWares,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default function configureStore() {
  const store = createStore(rootReducer, undefined, composedEnhancers);

  sagaMiddleware.run(rootSaga);

  return store;
}
