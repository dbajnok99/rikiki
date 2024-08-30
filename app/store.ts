import { configureStore, combineReducers } from "@reduxjs/toolkit";
import GameReducer from "../screens/game/GameSlice";
import GlobalReducer from "../screens/GlobalSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  Game: GameReducer,
  Global: GlobalReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;

export default store;
