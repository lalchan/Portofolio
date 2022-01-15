import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import { modelType } from "../../global/dataTypes/enums";
// Define a type for the slice state
interface ModelState {
  value: modelType
}

// Define the initial state using that type
const initialState: ModelState = {
  value: modelType.NONE
}

export const modelSlice = createSlice({
  name: 'model',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    
    changeModel: (state, action: PayloadAction<modelType>) => {
      state.value = action.payload
    }
  }
})

export const { changeModel } = modelSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.model.value

export default modelSlice.reducer