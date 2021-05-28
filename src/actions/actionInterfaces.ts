import { actionTypes } from "./actionTypes";

interface AddNotePayload {
  note: object;
  name: string;
}

interface ChangeTitlePayload {
  id: number;
  title: string;
  name: string;
}

interface ChangeNotePayload {
  id: number;
  note: string;
  name: string;
}

interface ReorderNotePayload {
  idStart: string;
  idEnd: string;
  indexStart: number;
  indexEnd: number;
}

interface DeleteNotePayload {
  id: number;
  name: string;
}

export interface ChangeTitle {
  type: typeof actionTypes.CHANGE_TITLE;
  payload: ChangeTitlePayload;
}

export interface ChangeNote {
  type: typeof actionTypes.CHANGE_NOTE;
  payload: ChangeNotePayload;
}

export interface AddNote {
  type: typeof actionTypes.ADD_NOTE;
  payload: AddNotePayload;
}

export interface DeleteNote {
  type: typeof actionTypes.DELETE_NOTE;
  payload: DeleteNotePayload;
}

export interface Reorder {
  type: typeof actionTypes.REORDER;
  payload: ReorderNotePayload;
}

export interface CloseAlert {
  type: typeof actionTypes.CLOSE_ALERT;
}

// export type Action = ChangeNote | ChangeTitle | Reorder | DeleteNote | AddNote;
