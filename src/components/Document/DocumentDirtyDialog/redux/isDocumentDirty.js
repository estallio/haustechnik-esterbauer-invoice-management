import { createSlice } from '@reduxjs/toolkit';

const isDocumentDirtySlice = createSlice({
  name: 'isDocumentDirty',
  initialState: false,
  reducers: {
    setIsDocumentDirty: (state, action) => action.payload,
  },
});

export const { setIsDocumentDirty } = isDocumentDirtySlice.actions;

export default isDocumentDirtySlice.reducer;

export const selectIsDocumentDirty = (state) => state.isDocumentDirty;
