import { createSlice } from '@reduxjs/toolkit';

const documentTypeSlice = createSlice({
  name: 'documentType',
  initialState: '',
  reducers: {
    setDocumentType: (state, action) => action.payload,
  },
});

export const { setDocumentType } = documentTypeSlice.actions;

export default documentTypeSlice.reducer;

export const getDocumentType = (state) => state.documentType;
