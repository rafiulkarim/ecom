import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import {
  productListReducers,
  productDetailsReducers,
} from "./reducers/productReducers";
import { cartReducers } from "./reducers/cartReducers";
import {
  userLoginReducers,
  userProfileReducers,
  userRegistrationReducers,
} from "./reducers/userReducers";

// Combine your reducers
const reducer = combineReducers({
  productList: productListReducers,
  productDetails: productDetailsReducers,
  cart: cartReducers,
  userLogin: userLoginReducers,
  userRegistration: userRegistrationReducers,
  userDetails: userProfileReducers,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const getUserInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// Initial state setup
const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: getUserInfoFromStorage },
};

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
