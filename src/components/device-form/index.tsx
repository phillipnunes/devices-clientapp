import {useEffect, useState} from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Stack,
  Typography
} from '@mui/material';
import {DeviceWithId} from "../../types/device";
import Select from "../select";
import {devices} from "../../constants";

type DeviceForm = {
  title: string;
  open: boolean;
  onClose: () => void;
  onSave: (arg: DeviceWithId) => void;
  edit: DeviceWithId;
}

function DeviceFormComponent({ title, open, onClose, onSave, edit }: DeviceForm): JSX.Element {
  const [id, setId] = useState<string>('');
  const [systemName, setSystemName] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [hddCapacity, setHddCapacity] = useState<number>(0);
  const [hasError, setHasError] = useState(false)

  function setEditValues() {
    setId(edit.id);
    setSystemName(edit.systemName);
    setType(edit.type);
    setHddCapacity(edit.hddCapacity);
  }

  function resetValues() {
    setSystemName('');
    setType('');
    setHddCapacity(0);
  }

  useEffect(() => {
    if (edit?.isEditing) {
      setEditValues();
    }
  }, [edit])

  function formIsValid() {
    if (systemName === '' || type === '' || hddCapacity === 0) {
      setHasError(true);
      return false;
    }

    setHasError(false);
    return true;
  }

  function handleSave() {
    if(!formIsValid()) {
      return;
    }

    function getDeviceId(value: string) {
      return devices.filter(device => device.value === value)[0].id
    }

    onSave({
      id,
      isEditing: edit?.isEditing,
      systemName,
      type: getDeviceId(type),
      hddCapacity
    })

    resetValues()
  }

  function handleClose() {
    setHasError(false);
    resetValues()
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {hasError && <Typography sx={{color: 'red'}} >Please, fill out all entry fields</Typography>}
        <Stack component="form" spacing={3}>
          <TextField
            aria-label="system name"
            autoFocus
            margin="dense"
            label="System Name"
            type="text"
            fullWidth
            required
            variant="standard"
            value={systemName}
            onChange={event => setSystemName(event.target.value)}
          />
          <Select
            options={devices}
            label="Type"
            onChange={value => setType(value)}
            initialValue={edit?.type}
          />
          <TextField
            aria-label="hdd capacity"
            margin="dense"
            label="HDD Capacity (GB)"
            type="text"
            fullWidth
            required
            variant="standard"
            value={hddCapacity}
            onChange={event => setHddCapacity(Number(event.target.value.replace(/[^0-9]/g,"")))}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleSave}>Save</Button>
        <Button variant="contained" onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeviceFormComponent;
