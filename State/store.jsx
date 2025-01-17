import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import rootReducer from "./rootReducer";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger, thunk))
);

export default store;
// composeWithDevTools(applyMiddleware(logger, thunk));
// applyMiddleware(thunk);
