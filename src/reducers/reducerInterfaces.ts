export interface IItem {
  id: string;
  title: string;
  noteArea: string;
}

export interface INotes {
  items: IItem[];
}

export interface IColumns {
  [key: string]: INotes;
}

export interface IState {
  columns: IColumns;
  isAlertOpen: boolean;
}
