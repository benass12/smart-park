import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import createRootReducer from "../reducers";

export const history = createBrowserHistory();

const rootReducer = createRootReducer(history);
const initialState = {};
const middlewares = [thunk, routerMiddleware(history)];

export const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(...middlewares))
);
