import { createSlice } from '@reduxjs/toolkit';

const footerTextSlice = createSlice({
  name: 'footerText',
  initialState: '',
  reducers: {
    setFooterText: (state, action) => action.payload,
  },
});

export const { setFooterText } = footerTextSlice.actions;

export default footerTextSlice.reducer;

export const selectFooterText = (state) => state.footerText;
