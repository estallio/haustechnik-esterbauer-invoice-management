import { createSlice } from '@reduxjs/toolkit';

const subjectSlice = createSlice({
  name: 'subject',
  initialState: '',
  reducers: {
    setSubject: (state, action) => action.payload,
  },
});

export const { setSubject } = subjectSlice.actions;

export default subjectSlice.reducer;

export const getSubject = (state) => state.subject;
