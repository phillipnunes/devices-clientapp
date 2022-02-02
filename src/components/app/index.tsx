import './styles.scss'
import Table from "../Table";
import {DataContext} from "../../context/data";
import {useContext, useEffect} from "react";

function App(): JSX.Element {
  const devices = useContext(DataContext);

  return (
    <div className="app">
      <Table devices={devices} />
    </div>
  );
}

export default App;
