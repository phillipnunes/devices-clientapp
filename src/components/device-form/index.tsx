import {useEffect, useState} from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Stack
} from '@mui/material';
import {DeviceWithId} from "../../types/device";
import Select from "../select";
import {options} from "../../constants";

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

  function handleSave() {
    function getOptionId(value: string) {
      return options.filter(option => option.value === value)[0].id
    }

    onSave({
      id,
      isEditing: edit?.isEditing,
      systemName,
      type: getOptionId(type),
      hddCapacity
    })

    resetValues()
  }

  function handleClose() {
    resetValues()
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
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
            options={options}
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
