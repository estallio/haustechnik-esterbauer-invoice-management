import { createSlice } from '@reduxjs/toolkit';

const headlineSlice = createSlice({
  name: 'headline',
  initialState: '',
  reducers: {
    setHeadline: (state, action) => action.payload,
  },
});

export const { setHeadline } = headlineSlice.actions;

export default headlineSlice.reducer;

export const getHeadline = (state) => state.headline;
