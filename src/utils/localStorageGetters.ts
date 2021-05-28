export const getColumnsFromLocalStorage = () =>
  localStorage.getItem("columns")
    ? JSON.parse(localStorage.getItem("columns") || "{}")
    : {
        Todo: {
          items: [],
        },
        "In Progress": {
          items: [],
        },
        Done: {
          items: [],
        },
      };
