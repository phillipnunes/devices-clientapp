import {
  Table as TableMUI,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import {Device} from "../../types/device";

export default function Table({devices}: {devices: Device[]}) {
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
          {devices.map((device: Device) => (
            <TableRow
              key={device.id}
            >
              <TableCell>{device.id}</TableCell>
              <TableCell align="right">{device.system_name}</TableCell>
              <TableCell align="right">{device.type}</TableCell>
              <TableCell align="right">{device.hdd_capacity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableMUI>
    </TableContainer>
  );
}
