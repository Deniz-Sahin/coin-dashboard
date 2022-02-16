import { applyMiddleware, createStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";

import { PersistGate } from "redux-persist/integration/react";
import React from "react";
import { Provider as ReactReduxProvider } from "react-redux";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

const defaultPersistConfig = {
	key: "deniz",
	storage,
};

export function configureRedux(reducer, options) {
	const persistConfig = Object.assign({}, defaultPersistConfig, options);
	const persistedReducer = persistReducer(persistConfig, reducer);
	const store = createStore(persistedReducer, applyMiddleware(thunk));
	const persistor = persistStore(store);

	return { store, persistor };
}

export default function ReduxProvider({ store, persistor, children }) {
	return (
		<ReactReduxProvider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				{children}
			</PersistGate>
		</ReactReduxProvider>
	);
}
