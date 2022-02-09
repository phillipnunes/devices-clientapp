import {screen, render} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import Table from "./index";

const devices = [
  {
    id: 'ababab',
    systemName: 'Phillip System',
    type: 'Mac',
    hddCapacity: 10,
    show: true
  },
  {
    id: 'cdcdcd',
    systemName: 'Mary System',
    type: 'Windows Server',
    hddCapacity: 100,
    show: true
  },
]

describe('<Table />', function () {
  it('should render item', async function () {
    render(<Table devices={devices} setEdit={() => null}  />);

    expect(screen.getByText('ababab')).toBeInTheDocument();
  });

  it('should call edit function', async function () {
    const mockFn = jest.fn();
    render(<Table devices={devices} setEdit={mockFn}  />);

    const edit = screen.getByLabelText('Edit device ababab')

    userEvent.click(edit);

    expect(mockFn).toHaveBeenCalledWith({
      ...devices[0],
      isEditing: true
    });
  });
});
