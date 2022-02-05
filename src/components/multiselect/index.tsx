import {useState} from "react";
import SelectMUI, {components, MultiValue} from "react-select";
import {Tag} from '../../types/tag'

type SelectType = {
  options: MultiValue<Tag>;
  onChange: (arg: string[]) => void;
  isMulti?: boolean;
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

export default function Select({ options, onChange, isMulti }: SelectType): JSX.Element {
  const [selectedOptions, setSelectedOptions] = useState<MultiValue<Tag>>([])

  function tagsToArray(tags: MultiValue<Tag>): string[] {
    return tags.map(tag => tag.value);
  }

  function handleChange(selected: MultiValue<Tag>) {
    setSelectedOptions(selected);
    onChange(tagsToArray(selected));
  }

  return (
    <SelectMUI
      options={options}
      isMulti={isMulti}
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
