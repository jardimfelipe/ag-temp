import { configureStore } from "@reduxjs/toolkit";
import { useSelector, TypedUseSelectorHook, useDispatch } from "react-redux";
import { userSlice } from "./reducer/user.reducer";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { serviceListSlice } from "./reducer/servicesList.reducer";
import { scheduleSlice } from "./reducer/schedule.reducer";

const persistConfig = {
	key: "root",
	storage: storage,
};

const reducers = combineReducers({
	user: userSlice.reducer,
	serviceList: serviceListSlice.reducer,
	schedule: scheduleSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
	reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
