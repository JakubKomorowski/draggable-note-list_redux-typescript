import { actionTypes } from "../actions/actionTypes";
import { v4 as uuidv4 } from "uuid";
import { IItem, IState } from "./reducerInterfaces";

const item = {
  id: uuidv4(),
  title: "",
  noteArea: "",
};

const initialState = {
  columns: {
    Todo: {
      items: [item],
    },
    "In Progress": {
      items: [],
    },
    Done: {
      items: [],
    },
  },

  isAlertOpen: false,
};

const mainReducer = (state: IState = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.CHANGE_TITLE:
      const newTitle = state.columns[payload.name].items.map((item: IItem) => {
        if (item.id === payload.id) {
          item.title = payload.title;
        }
        return item;
      });

      return {
        ...state,
        columns: {
          ...state.columns,
          [payload.name]: {
            items: [...newTitle],
          },
        },
      };

    case actionTypes.CHANGE_NOTE:
      const newNote = state.columns[payload.name].items.map((item: IItem) => {
        if (item.id === payload.id) {
          item.noteArea = payload.note;
        }
        return item;
      });
      return {
        ...state,
        columns: {
          ...state.columns,
          [payload.name]: {
            items: [...newNote],
          },
        },
      };

    case actionTypes.ADD_NOTE:
      const checkIfEmpty = (el: IItem) => el.title || el.noteArea !== "";

      const checked = state.columns[payload.name].items.every(checkIfEmpty);

      if (!checked) {
        state.isAlertOpen = true;
      }

      return {
        ...state,
        columns: {
          ...state.columns,
          [payload.name]: {
            items: checked
              ? [...state.columns[payload.name].items, payload.note]
              : [...state.columns[payload.name].items],
          },
        },
      };

    case actionTypes.DELETE_NOTE:
      const filteredNotes = state.columns[payload.name].items.filter(
        (item: IItem) => item.id !== payload.id
      );
      return {
        ...state,
        columns: {
          ...state.columns,
          [payload.name]: {
            items: [...filteredNotes],
          },
        },
      };

    case actionTypes.REORDER:
      const { idStart, idEnd, indexStart, indexEnd } = payload;

      const newItem = state.columns[idStart].items[indexStart];
      state.columns[idStart].items.splice(indexStart, 1);
      state.columns[idEnd].items.splice(indexEnd, 0, newItem);

      return {
        ...state,
      };

    case actionTypes.CLOSE_ALERT:
      return {
        ...state,
        isAlertOpen: false,
      };

    default:
      return state;
  }
};

export default mainReducer;
