import {render, screen} from "@testing-library/react";
import MultiSelect from "./index";
import userEvent from "@testing-library/user-event";

describe('<MultiSelect />', function () {
  const options = [{
    value: 'cms',
    label: 'cms'
  },{
    value: 'ux',
    label: 'ux'
  }]

  it('should display selected option', function () {
    const {container} = render(<MultiSelect options={options} onChange={() => jest.fn()}/>)

    const combobox = screen.getByText('Select...');
    userEvent.click(combobox);

    const option = screen.getByText('cms');
    userEvent.click(option);

    const selectedOption = container.getElementsByClassName('multiselect__multi-value__label')[0];

    expect(selectedOption).toHaveTextContent('cms');
  });
});