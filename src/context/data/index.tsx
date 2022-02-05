import {createContext, useEffect, useState} from 'react'
import {
  getDevices,
  deleteDevice,
  updateDevice as updateDeviceAPI,
  addDevice as addDeviceAPI
} from "../../api";
import {DeviceWithId} from "../../types/device";

type Context = {
  devices: DeviceWithId[];
  removeDevice: (arg: string) => void;
  updateDevice: (arg: DeviceWithId) => void;
  addDevice: (arg: DeviceWithId) => void;
}

export const DataContext = createContext<Context>({
  devices: [],
  removeDevice: () => null,
  updateDevice: () => null,
  addDevice: () => null
});

function DataContextProvider({ children }: JSX.ElementChildrenAttribute): JSX.Element {
  const [devices, setDevices] = useState<DeviceWithId[]>([]);

  useEffect(() => {
    getDevices().then(data => {
      setDevices(data)
    })
  }, [])

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
      if(response) {
        getDevices().then(data => {
          setDevices(data)
        });
      }
    })
  }

  return (
    <DataContext.Provider value={{devices, removeDevice, updateDevice, addDevice}}>
      {children}
    </DataContext.Provider>
  )
}

export default DataContextProvider;
