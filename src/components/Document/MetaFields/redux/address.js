import { createSlice } from '@reduxjs/toolkit';

const addressSlice = createSlice({
  name: 'address',
  initialState: '',
  reducers: {
    setAddress: (state, action) => action.payload,
  },
});

export const { setAddress } = addressSlice.actions;

export default addressSlice.reducer;

export const selectAddress = (state) => state.address;
