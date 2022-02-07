import {createContext, useEffect, useState} from 'react'
import {
  getDevices,
  deleteDevice,
  updateDevice as updateDeviceAPI,
  addDevice as addDeviceAPI
} from "../../api";
import {DeviceWithId} from "../../types/device";
import {properties} from "../../constants";

type Context = {
  devices: DeviceWithId[];
  removeDevice: (arg: string) => void;
  updateDevice: (arg: DeviceWithId) => void;
  addDevice: (arg: DeviceWithId) => void;
  sortDevices: (arg: string) => void;
}

export const DataContext = createContext<Context>({
  devices: [],
  removeDevice: () => null,
  updateDevice: () => null,
  addDevice: () => null,
  sortDevices: () => null
});

function DataContextProvider({ children }: JSX.ElementChildrenAttribute): JSX.Element {
  const [devices, setDevices] = useState<DeviceWithId[]>([]);

  useEffect(() => {
    getDevices().then(data => {
      setDevices(data)
    })
  }, [])

  useEffect(() => {
    console.log('AA', devices);
  }, [devices])

  function removeDevice(id: string) {
    deleteDevice(id).then(response => {
      if (response) {
        const updatedDevices = devices.filter(device => device.id !== id);
        setDevices(updatedDevices);
      }
    })
  }

  function updateDevice(device: DeviceWithId) {
    updateDeviceAPI(device).then(response => {
      if(response) {
        getDevices().then(data => {
          setDevices(data)
        });
      }
    })
  }

  function addDevice(device: DeviceWithId) {
    addDeviceAPI(device).then(response => {
      const {id, type, system_name, hdd_capacity} = response;
      if(id) {
        setDevices([
          ...devices,
          {
            id,
            type,
            systemName: system_name,
            hddCapacity: Number(hdd_capacity)
          }
        ])
      }
    })
  }

  function sortDevices(option: string) {
    const {SYSTEM_NAME, HDD_CAPACITY} = properties;

    function sortBy(prop: string) {
      const sorted = devices
        .sort((a, b) => {
          if (option === SYSTEM_NAME.name) {
            // @ts-ignore
            return a[prop].localeCompare(b[prop]); // The value is a string
          }
          // @ts-ignore
          return a[prop] - b[prop]; // The value is a Number
        })

      setDevices([...sorted]);
    }

    if (option === SYSTEM_NAME.name) {
      sortBy(SYSTEM_NAME.prop);
    }
    if (option === HDD_CAPACITY.name) {
      sortBy(HDD_CAPACITY.prop);
    }
  }

  return (
    <DataContext.Provider value={{devices, removeDevice, updateDevice, addDevice, sortDevices}}>
      {children}
    </DataContext.Provider>
  )
}

export default DataContextProvider;
