import './styles.scss'
import Table from "../table";
import {DataContext} from "../../context/data";
import {useContext, useEffect, useState} from "react";
import {Button} from "@mui/material";
import DeviceForm from "../device-form";
import {DeviceWithId} from "../../types/device";

function App(): JSX.Element {
  const {devices, updateDevice} = useContext(DataContext);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState({
    id: '',
    systemName: '',
    type: '',
    hddCapacity: 0
  })

  useEffect(() => {
    // @ts-ignore
    if (edit?.isEditing) {
      setOpen(true);
    }
  }, [edit])

  function handleOnSave(payload: DeviceWithId) {
    if (payload?.isEditing) {
      updateDevice(payload);
    }

    setOpen(false);
  }

  return (
    <div className="app">
      <Table devices={devices} setEdit={setEdit} />
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
