import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  listItems: [] as any,
  currentType: 'Plan to watch' as string,
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
    setTypeList: (state, action: PayloadAction<string>) => {
      state.currentType = action.payload;
    },
    removeItemFromList: (state, action) => {
      const newItems = state.listItems.filter((i: any) => i.id !== action.payload);
      state.listItems = newItems;
    },
  },
});

export default list.reducer;
export const { addToList, setTypeList, removeItemFromList } = list.actions;
