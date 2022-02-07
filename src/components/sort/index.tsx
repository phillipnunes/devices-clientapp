import {useState} from "react";
import Select from "../select";

const options = [
  {id: 'SYSTEM_NAME', value: 'System Name'},
  {id: 'HDD_CAPACITY', value: 'HDD Capacity'},
]

export default function Sort() {
  const [item, setItem] = useState('');

  return <Select
    options={options}
    label="Sort By"
    onChange={value => setItem(value)}
  />
}
