import MultiSelect from "../multiselect";
import {devices} from "../../constants";
import {useContext} from "react";
import {DataContext} from "../../context/data";

export default function Filter() {
  const {filterDevices} = useContext(DataContext);

  return <MultiSelect
    label="Device Type"
    options={devices}
    onChange={items => filterDevices(items)}
  />
}
