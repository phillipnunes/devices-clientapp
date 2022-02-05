import {useEffect, useState} from 'react';
import {Box, InputLabel, MenuItem, FormControl} from '@mui/material';
import SelectMUI, { SelectChangeEvent } from '@mui/material/Select';

type Option = {
  id: string;
  value: string;
}

type Select = {
  options: Option[];
  label: string;
  onChange: (arg: string) => void;
  initialValue: string;
}

export default function Select({options, label, onChange, initialValue}: Select) {
  const [value, setValue] = useState('');

  useEffect(() => {
    if(initialValue) {
      setValue(initialValue);
    }
  }, [initialValue])

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    setValue(value);
    onChange(value);
  };

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id={`select-${label}`}>{label}</InputLabel>
        <SelectMUI
          aria-label="hdd capacity"
          labelId={`select-${label}`}
          value={value}
          label={label}
          onChange={handleChange}
        >
          {options.map(option => <MenuItem key={option.id} value={option.value}>{option.value}</MenuItem>)}
        </SelectMUI>
      </FormControl>
    </Box>
  );
}
