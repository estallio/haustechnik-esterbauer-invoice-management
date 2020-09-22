// valid as redux-toolkit handles this with immerjs
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const listDataSlice = createSlice({
  name: 'listData',
  initialState: {
    selectedId: null,
    isLoading: false,
  },
  reducers: {
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setSelectedId, setIsLoading } = listDataSlice.actions;

export default listDataSlice.reducer;

export const selectListData = (state) => state.listData;

export const selectSelectedId = (state) => selectListData(state).selectedId;

export const selectIsLoading = (state) => selectListData(state).isLoading;
