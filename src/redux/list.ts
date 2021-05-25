import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListItem, ListItems, ListTypeById } from '../interfaces/interfaces';

interface RemoveItemFromList {
  id: number;
  type: string;
}

interface AddToList {
  category: string;
  item: ListItem;
}

const initialState = {
  listItems: {} as ListItems,
  currentType: 'Plan to watch' as string,
  addedItemsIds: [] as number[],
  listTypeById: {} as ListTypeById,
};

const list = createSlice({
  name: 'list',
  initialState,
  reducers: {
    addToList: (state, action: PayloadAction<AddToList>) => {
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
          (item: ListItem) => item.id === action.payload.item.id,
        );
        if (!availableCheck) {
          state.listItems[action.payload.item.type].items.push(action.payload.item);
        }
      }

      state.addedItemsIds.push(action.payload.item.id);
      state.listTypeById = {
        ...state.listTypeById,
        [action.payload.item.id]: {
          type: action.payload.item.type,
        },
      };

      localStorage.setItem('list', JSON.stringify(state.listItems));
      localStorage.setItem('addedItemsListIds', JSON.stringify(state.addedItemsIds));
      localStorage.setItem('listTypeById', JSON.stringify(state.listTypeById));
    },

    setTypeList: (state, action: PayloadAction<string>) => {
      state.currentType = action.payload;
    },

    removeItemFromList: (state, action: PayloadAction<RemoveItemFromList>) => {
      state.listItems[action.payload.type].items = state.listItems[
        action.payload.type
      ].items.filter((item: ListItem) => item.id !== action.payload.id);

      delete state.listTypeById[action.payload.id];
      state.addedItemsIds = state.addedItemsIds.filter((id: number) => id !== action.payload.id);

      localStorage.setItem('list', JSON.stringify(state.listItems));
      localStorage.setItem('listTypeById', JSON.stringify(state.listTypeById));
    },

    removeTypeFromList: (state, action: PayloadAction<string>) => {
      if (state.listItems[action.payload].items.length === 0) {
        delete state.listItems[action.payload];
      }

      localStorage.setItem('list', JSON.stringify(state.listItems));
    },
  },
});

export default list.reducer;
export const { addToList, setTypeList, removeItemFromList, removeTypeFromList } = list.actions;
