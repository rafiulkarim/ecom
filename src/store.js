import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import {
  productListReducers,
  productDetailsReducers,
} from "./reducers/productReducers";

// Combine your reducers
const reducer = combineReducers({
  productList: productListReducers,
  productDetails: productDetailsReducers,
});

// Initial state setup
const initialState = {};

// Middleware setup (including redux-thunk)
const middleware = [thunk];

// This allows for both Redux DevTools and middleware to coexist
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware)) // Apply both middleware and Redux DevTools
);

export default store;
