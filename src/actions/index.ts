import { IItem } from "../reducers/reducerInterfaces";
import {
  AddNote,
  ChangeNote,
  ChangeTitle,
  DeleteNote,
  Reorder,
} from "./actionInterfaces";
import { actionTypes } from "./actionTypes";

export const changeTitle = (
  id: number,
  title: string,
  name: string
): ChangeTitle => ({
  type: actionTypes.CHANGE_TITLE,
  payload: {
    id,
    title,
    name,
  },
});

export const changeNote = (
  id: number,
  note: string,
  name: string
): ChangeNote => ({
  type: actionTypes.CHANGE_NOTE,
  payload: {
    id,
    note,
    name,
  },
});

export const addNote = (note: IItem, name: string): AddNote => ({
  type: actionTypes.ADD_NOTE,
  payload: { note, name },
});

export const deleteNote = (id: number, name: string): DeleteNote => ({
  type: actionTypes.DELETE_NOTE,
  payload: { id, name },
});

export const reorder = (
  idStart: string,
  idEnd: string,
  indexStart: number,
  indexEnd: number
): Reorder => ({
  type: actionTypes.REORDER,
  payload: {
    idStart,
    idEnd,
    indexStart,
    indexEnd,
  },
});

export const closeAlert = () => ({
  type: actionTypes.CLOSE_ALERT,
});
