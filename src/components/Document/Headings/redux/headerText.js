import { createSlice } from '@reduxjs/toolkit';

const headerTextSlice = createSlice({
  name: 'headerText',
  initialState: '',
  reducers: {
    setHeaderText: (state, action) => action.payload,
  },
});

export const { setHeaderText } = headerTextSlice.actions;

export default headerTextSlice.reducer;

export const getHeaderText = (state) => state.headerText;
