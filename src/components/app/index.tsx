import './styles.scss'
import Table from "../Table";
import {DataContext} from "../../context/data";
import {useContext, useState} from "react";
import {Button} from "@mui/material";
import DeviceForm from "../device-form";
import {Device} from "../../types/device";

function App(): JSX.Element {
  const [open, setOpen] = useState(false);
  const devices = useContext(DataContext);

  const edit = {
    systemName: '',
    type: '',
    hddCapacity: 0
  }

  function handleOnSave(payload: Device) {
    console.log('AA', payload)
  }

  return (
    <div className="app">
      <Table devices={devices} />
      <Button
        variant="contained"
        onClick={() => setOpen(true)}>
          Add New Device
      </Button>
      <DeviceForm
        title="Add Device"
        open={open}
        onClose={() => setOpen(false)}
        onSave={data => handleOnSave(data)}
        edit={edit}
      />
    </div>
  );
}

export default App;
