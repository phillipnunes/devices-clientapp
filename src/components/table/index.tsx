import {
  Table as TableMUI,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import {DeviceWithId} from "../../types/device";
import {useContext} from "react";
import {DataContext} from "../../context/data";

type Table = {
  devices: DeviceWithId[];
  setEdit: (arg: DeviceWithId) => void;
}

export default function Table({devices, setEdit}: Table) {
  const {removeDevice} = useContext(DataContext);

  return (
    <TableContainer component={Paper}>
      <TableMUI aria-label="devices table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">System Name</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">HDD Capacity</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {devices?.map((device: DeviceWithId) => (
            <TableRow
              key={device.id}
            >
              <TableCell>{device.id}</TableCell>
              <TableCell align="right">{device.systemName}</TableCell>
              <TableCell align="right">{device.type}</TableCell>
              <TableCell align="right">{device.hddCapacity}</TableCell>
              <TableCell align="right">
                <Edit
                  cursor="pointer"
                  titleAccess="Edit"
                  onClick={() => setEdit({
                    ...device,
                    isEditing: true,
                  })}
                />
                <Delete
                  cursor="pointer"
                  titleAccess="Delete"
                  onClick={() => removeDevice(device.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableMUI>
    </TableContainer>
  );
}
