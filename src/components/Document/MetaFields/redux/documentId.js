import { createSlice } from '@reduxjs/toolkit';

const documentIdSlice = createSlice({
  name: 'documentId',
  initialState: '',
  reducers: {
    setDocumentId: (state, action) => action.payload,
  },
});

export const { setDocumentId } = documentIdSlice.actions;

export default documentIdSlice.reducer;

export const selectDocumentId = (state) => state.documentId;
