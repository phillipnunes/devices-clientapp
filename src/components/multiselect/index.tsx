import {useState} from "react";
import Select, {components, MultiValue} from "react-select";
import {Tag} from '../../types/tag'

type SelectType = {
  options: MultiValue<Tag>;
  onChange: (arg: string[]) => void;
}

const Option = (props: any) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

export default function MultiSelect({ options, onChange }: SelectType): JSX.Element {
  const [selectedOptions, setSelectedOptions] = useState<MultiValue<Tag>>([])

  function tagsToArray(tags: MultiValue<Tag>): string[] {
    return tags.map(tag => tag.value);
  }

  function handleChange(selected: MultiValue<Tag>) {
    setSelectedOptions(selected);
    onChange(tagsToArray(selected));
  }

  return (
    <Select
      options={options}
      isMulti
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      components={{
        Option
      }}
      onChange={handleChange}
      value={selectedOptions}
      classNamePrefix="multiselect"
    />
  )
}