import {createContext, useEffect, useState} from 'react'
import {
  getDevices,
  deleteDevice,
  updateDevice as updateDeviceAPI,
  addDevice as addDeviceAPI
} from "../../api";
import {DeviceApi, DeviceWithId} from "../../types/device";
import {properties} from "../../constants";

type Context = {
  devices: DeviceWithId[];
  removeDevice: (arg: string) => void;
  updateDevice: (arg: DeviceWithId) => void;
  addDevice: (arg: DeviceWithId) => void;
  sortDevices: (arg: string) => void;
  filterDevices: (arg: string | string[]) => void;
}

export const DataContext = createContext<Context>({
  devices: [],
  removeDevice: () => null,
  updateDevice: () => null,
  addDevice: () => null,
  sortDevices: () => null,
  filterDevices: () => null,
});

function DataContextProvider({ children }: JSX.ElementChildrenAttribute): JSX.Element {
  const [devices, setDevices] = useState<DeviceWithId[]>([]);
  const [filteredDevices, setFilteredDevices] = useState<DeviceWithId[]>([]);
  const [filterOptions, setFilterOptions] = useState<string | string[]>([]);
  const list = filterOptions.length ? filteredDevices : devices

  useEffect(() => {
    getDevices().then(data => {
      setDevices(data)
    })
  }, [])

  useEffect(() => {
    // Re-filtering list of devices after changing something
    if (filterOptions.length) {
      filterDevices(filterOptions);
    }
  }, [devices])

  function updateStateWhenFiltering(data: DeviceWithId[]) {
    if (filterOptions.length) {
      setFilteredDevices(data);
    }
  }

  function updateStateWhenSuccessful(response: DeviceApi | number) {
    if(response) {
      getDevices().then(data => {
        setDevices(data)
        updateStateWhenFiltering(data)
      });
    }
  }

  function removeDevice(id: string) {
    deleteDevice(id).then(response => {
      if (response) {
        const updatedDevices = devices.filter(device => device.id !== id);
        setDevices(updatedDevices);
        updateStateWhenFiltering(updatedDevices)
      }
    })
  }

  function updateDevice(device: DeviceWithId) {
    updateDeviceAPI(device).then(response => {
      updateStateWhenSuccessful(response)
    })
  }

  function addDevice(device: DeviceWithId) {
    addDeviceAPI(device).then(response => {
      updateStateWhenSuccessful(response);
    })
  }

  function sortDevices(option: string) {
    const {SYSTEM_NAME, HDD_CAPACITY} = properties;

    function sortBy(prop: string) {
      const sorted = list
        .sort((a, b) => {
          if (option === SYSTEM_NAME.name) {
            // @ts-ignore
            return a[prop].localeCompare(b[prop]); // The value is a string
          }
          // @ts-ignore
          return a[prop] - b[prop]; // The value is a Number
        })

      setFilteredDevices([...sorted]);
    }

    if (option === SYSTEM_NAME.name) {
      sortBy(SYSTEM_NAME.prop);
    }
    if (option === HDD_CAPACITY.name) {
      sortBy(HDD_CAPACITY.prop);
    }
  }

  function filterDevices(options: string | string[]) {
    if (!options.length) { // Set all items if there is no filter selected
      setFilteredDevices(devices);
      setFilterOptions([]);
      return;
    }

    setFilterOptions(options);

    const filtered = devices.map(device => {
      if (!options.includes(device.type)) {
        return {
          ...device,
          show: false
        }
      }
      return device;
    })

    setFilteredDevices([...filtered]);
  }

  return (
    <DataContext.Provider value={{
      devices: list,
      removeDevice,
      updateDevice,
      addDevice,
      sortDevices,
      filterDevices
    }}>
      {children}
    </DataContext.Provider>
  )
}

export default DataContextProvider;
