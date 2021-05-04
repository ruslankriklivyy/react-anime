import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  listItems: [] as any,
};

const list = createSlice({
  name: 'list',
  initialState,
  reducers: {
    addToList: (state, action) => {
      let ids: Array<string> = [];

      if (state.listItems.length > 0) {
        state.listItems.forEach((i: any) => {
          if (i.id === action.payload.item.id) {
            ids.push(action.payload.item.id);
          }
        });
      }

      if (state.listItems.length === 0 || ids[ids.length - 1] !== action.payload.item.id) {
        state.listItems.push(action.payload.item);
      }
    },
  },
});

export default list.reducer;
export const { addToList } = list.actions;
