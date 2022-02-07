import MultiSelect from "../multiselect";
import {devices} from "../../constants";

export default function Filter() {
  return <MultiSelect
    label="Device Type"
    options={devices}
  />
}
