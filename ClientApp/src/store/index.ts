import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import creatOidcMiddleware from "redux-oidc";
import { reducer as oidcReducer, loadUser } from "redux-oidc";

import { dataIngestionReducer } from "./data-ingestion/reducers";
import { appReducer } from "./app/reducers";
import { mappingReducer } from "./mapping/reducers";
import { commentaryReducer } from "./commentary/reducers";
import { adminReducer } from "./admin/reducers";

import userManager from "../helpers/sso/userManager";

const rootReducer = combineReducers({
  dataIngestion: dataIngestionReducer,
  app: appReducer,
  mapping: mappingReducer,
  commentary: commentaryReducer,
  oidc: oidcReducer,
  admin: adminReducer,
});

export type AppStateType = ReturnType<typeof rootReducer>;

export default function configureStore() {
  userManager.events.addSilentRenewError(function (error) {
    console.error("error while renewing the access token", error);
  });

  const oidcMiddleware = creatOidcMiddleware(userManager);

  const middlewares = [thunkMiddleware, oidcMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(
    rootReducer,
    composeWithDevTools(middleWareEnhancer)
  );
  loadUser(store, userManager);

  return store;
}
