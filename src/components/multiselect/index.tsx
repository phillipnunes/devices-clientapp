import {useState} from 'react';
import {
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from '@mui/material';

type Option = {
  id: string,
  value: string
}

type MultiSelect = {
  label: string,
  options: Option[]
}

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 224,
      width: 250,
    },
  },
};

export default function MultiSelectComponent({label, options}: MultiSelect) {
  const [item, setItem] = useState<string | string[]>([]);

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="multiple-select">{label}</InputLabel>
        <Select
          labelId="multiple-select"
          multiple
          value={item}
          onChange={event => setItem(event.target.value)}
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
    </div>
  );
}
