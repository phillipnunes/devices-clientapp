import {createContext, useEffect, useState} from 'react'
import {getDevices} from "../../api";
import {Device} from "../../types/device";

export const DataContext = createContext<Device[]>([]);

function DataContextProvider({ children }: JSX.ElementChildrenAttribute): JSX.Element {
  const [devices, setDevices] = useState<Device[]>([]);

  useEffect(() => {
    getDevices().then(data => {
      setDevices(data)
    })
  }, [])

  return (
    <DataContext.Provider value={devices}>
      {children}
    </DataContext.Provider>
  )
}

export default DataContextProvider;
