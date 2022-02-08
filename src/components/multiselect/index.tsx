import {useState} from 'react';
import {
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Box
} from '@mui/material';

type Option = {
  id: string;
  value: string;
}

type MultiSelect = {
  label: string;
  options: Option[];
  onChange: (arg: string | string[]) => void;
}

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 224,
      width: 250,
    },
  },
};

export default function MultiSelectComponent({label, options, onChange}: MultiSelect) {
  const [item, setItem] = useState<string | string[]>([]);

  function handleOnChange(items: string | string[]) {
    setItem(items);
    onChange(items);
  }

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel id="multiple-select">{label}</InputLabel>
        <Select
          labelId="multiple-select"
          multiple
          value={item}
          onChange={event => handleOnChange(event.target.value)}
          input={<OutlinedInput label={label} />}
          MenuProps={MenuProps}
        >
          {options.map((option) => (
            <MenuItem
              key={option.id}
              value={option.value}
            >
              {option.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
