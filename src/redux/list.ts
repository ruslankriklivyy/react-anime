import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  listItems: {} as any,
  allTypes: [] as any,
  currentType: 'Plan to watch' as string,
};

const list = createSlice({
  name: 'list',
  initialState,
  reducers: {
    addToList: (state, action) => {
      if (!state.listItems[action.payload.item.type]) {
        const newList = {
          ...state.listItems,
          [action.payload.item.type]: {
            items: [action.payload.item],
          },
        };
        state.listItems = newList;
      } else {
        const availableCheck = state.listItems[action.payload.item.type].items.some(
          (item: any) => item.id === action.payload.item.id,
        );
        if (!availableCheck) {
          state.listItems[action.payload.item.type].items.push(action.payload.item);
        }
      }
      localStorage.setItem('list', JSON.stringify(state.listItems));
    },
    setTypeList: (state, action: PayloadAction<string>) => {
      state.currentType = action.payload;
    },
    removeItemFromList: (state, action) => {
      state.listItems[action.payload.type].items = state.listItems[
        action.payload.type
      ].items.filter((item: any) => item.id !== action.payload.id);
      localStorage.setItem('list', JSON.stringify(state.listItems));
    },
    addTypeToList: (state, action) => {
      if (!state.allTypes.includes(action.payload)) {
        state.allTypes.push(action.payload);
        localStorage.setItem('listTypes', JSON.stringify(state.allTypes));
      }
    },
    removeTypeFromList: (state, action) => {
      if (state.listItems[action.payload].items.length === 0) {
        delete state.listItems[action.payload];
      }

      localStorage.setItem('list', JSON.stringify(state.listItems));
    },
  },
});

export default list.reducer;
export const { addToList, setTypeList, removeItemFromList, addTypeToList, removeTypeFromList } =
  list.actions;
