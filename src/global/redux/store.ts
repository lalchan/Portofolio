import { configureStore } from "@reduxjs/toolkit";
import ModelRecuder from "./reducer";

export const store = configureStore({
	reducer:{
		model: ModelRecuder
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch