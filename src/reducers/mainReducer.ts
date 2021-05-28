import { actionTypes } from "../actions/actionTypes";
import { IItem, IState } from "./reducerInterfaces";
import { getColumnsFromLocalStorage } from "../utils/localStorageGetters";

const initialState = {
  columns: getColumnsFromLocalStorage(),
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

      if (idStart === idEnd) {
        const colStart = state.columns[idStart];
        const item = colStart.items.splice(indexStart, 1);
        colStart.items.splice(indexEnd, 0, ...item);
        return {
          ...state,
          columns: {
            ...state.columns,
            [idStart]: colStart,
          },
        };
      } else {
        const colStart = state.columns[idStart];
        const item = colStart.items.splice(indexStart, 1);
        const colEnd = state.columns[idEnd];
        colEnd.items.splice(indexEnd, 0, ...item);
        return {
          ...state,
          columns: {
            ...state.columns,
            [idStart]: colStart,
            [idEnd]: colEnd,
          },
        };
      }

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
