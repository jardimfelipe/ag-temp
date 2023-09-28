import { configureStore } from "@reduxjs/toolkit";
import { useSelector, TypedUseSelectorHook, useDispatch } from "react-redux";
import { userSlice } from "./reducer/user.reducer";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { serviceListSlice } from "./reducer/servicesList.reducer";
import { scheduleSlice } from "./reducer/schedule.reducer";
import {
	createSerializableStateInvariantMiddleware,
	isPlain,
} from "@reduxjs/toolkit";
import { barberSlice } from "./reducer/barber.reducer";

// Augment middleware to consider Immutable.JS iterables serializable
const isSerializable = (value: any) => value || isPlain(value);

const getEntries = (value: any) => value;

const serializableMiddleware = createSerializableStateInvariantMiddleware({
	isSerializable,
	getEntries,
});

const persistConfig = {
	key: "root",
	storage: storage,
};

const reducers = combineReducers({
	user: userSlice.reducer,
	serviceList: serviceListSlice.reducer,
	schedule: scheduleSlice.reducer,
	barber: barberSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: [serializableMiddleware],
});

// TODO Revisar o Redux Persist e substituir pelo SWR e tornar utilizar o localStorage quando for realmente necessário
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
