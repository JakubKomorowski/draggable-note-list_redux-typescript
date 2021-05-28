import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Alert from "./components/Alert";
import Notes from "./components/Notes";
import { IState } from "./reducers/reducerInterfaces";

function App() {
  const columns = useSelector((state: IState) => state.columns);

  useEffect(() => {
    localStorage.setItem("columns", JSON.stringify(columns));
  }, [columns]);

  return (
    <>
      <Alert />
      <Notes />
    </>
  );
}

export default App;
