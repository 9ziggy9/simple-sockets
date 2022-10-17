import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import session from "./session";

const rootReducer = combineReducers({
  session,
});

const enhancer = applyMiddleware(thunk);

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
