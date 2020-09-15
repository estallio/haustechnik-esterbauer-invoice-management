import { createSlice } from '@reduxjs/toolkit';

const nameSlice = createSlice({
  name: 'name',
  initialState: '',
  reducers: {
    setName: (state, action) => action.payload,
  },
});

export const { setName } = nameSlice.actions;

export default nameSlice.reducer;

export const getName = (state) => state.name;
