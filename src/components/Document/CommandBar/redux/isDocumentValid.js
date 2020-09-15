import { createSlice } from '@reduxjs/toolkit';

const isDocumentValidSlice = createSlice({
  name: 'isDocumentValid',
  initialState: true,
  reducers: {
    setIsDocumentValid: (state, action) => action.payload,
  },
});

export const { setIsDocumentValid } = isDocumentValidSlice.actions;

export default isDocumentValidSlice.reducer;

export const selectIsDocumentValid = (state) => state.isDocumentValid;
