import MultiSelect from "../multiselect";
import {options} from "../../constants";

export default function Filter() {
  return <MultiSelect
    label="Device Type"
    options={options}
  />
}
