import {useContext} from "react";
import Select from "../select";
import {DataContext} from "../../context/data";

const options = [
  {id: 'SYSTEM_NAME', value: 'System Name'},
  {id: 'HDD_CAPACITY', value: 'HDD Capacity'},
]

export default function Sort() {
  const {sortDevices} = useContext(DataContext);

  return <Select
    options={options}
    label="Sort By"
    onChange={value => sortDevices(value)}
  />
}
