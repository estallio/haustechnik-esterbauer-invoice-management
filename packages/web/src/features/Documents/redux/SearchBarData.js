// valid as redux-toolkit handles this with immerjs
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const searchBarDataSlice = createSlice({
  name: 'searchBarData',
  initialState: {
    isCollapsed: true,
    searchParams: {},
  },
  reducers: {
    setSearchBarData: (state, action) => action.payload,
    setIsCollapsed: (state, action) => {
      state.isCollapsed = action.payload;
    },
    toggleIsCollapsed: (state) => {
      state.isCollapsed = !state.isCollapsed;
    },
    setSearchParams: (state, action) => {
      state.searchParams = action.payload;
    },
    resetSearchParams: (state) => {
      state.searchParams = {};
    },
    setSearchParamByKey: {
      reducer: (state, action) => {
        const { key, value } = action.payload;
        state.searchParams[key] = value;
      },
      // maybe redux-toolkit does this by default, by i didn't test it so this lines preserves
      prepare: (key, value) => ({ payload: { key, value } }),
    },
  },
});

export const {
  setSearchBarData,
  setIsCollapsed,
  toggleIsCollapsed,
  setSearchParams,
  resetSearchParams,
  setSearchParamByKey,
} = searchBarDataSlice.actions;

export default searchBarDataSlice.reducer;

export const selectSearchBarData = (state) => state.searchBarData;

export const selectSearchParams = (state) =>
  selectSearchBarData(state).searchParams;

export const selectIsCollapsed = (state) =>
  selectSearchBarData(state).isCollapsed;
