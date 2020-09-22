// valid as redux-toolkit handles this with immerjs
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const documentDataSlice = createSlice({
  name: 'documentData',
  initialState: {},
  reducers: {
    setDocumentData: (state, action) => action.payload,
    setDocumentDataByKey: {
      reducer: (state, action) => {
        const { key, value } = action.payload;
        state[key] = value;
      },
      prepare: (key, value) => ({ payload: { key, value } }),
    },
  },
});

export const {
  setDocumentData,
  setDocumentDataByKey,
} = documentDataSlice.actions;

export const MutationActions = {
  setDocumentData,
  setDocumentDataByKey,
};

export default documentDataSlice.reducer;

export const selectDocumentData = (state) => state.documentData;
