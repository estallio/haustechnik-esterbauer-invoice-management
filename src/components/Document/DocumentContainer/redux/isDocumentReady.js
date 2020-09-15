import { createSlice } from '@reduxjs/toolkit';

const isDocumentReadySlice = createSlice({
  name: 'isDocumentReady',
  initialState: false,
  reducers: {
    setIsDocumentReady: (state, action) => action.payload,
  },
});

export const { setIsDocumentReady } = isDocumentReadySlice.actions;

export default isDocumentReadySlice.reducer;

export const getIsDocumentReady = (state) => state.isDocumentReady;
