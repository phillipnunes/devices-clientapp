import axios from 'axios';
import {Device, DeviceWithId, DeviceApi} from "./types/device";
import {devices} from "./constants";

const URL = 'http://localhost:3000';

function normalizeData(data: DeviceApi[]) {
  function getTypeValue(item: string) {
    return devices.filter(device => device.id === item)[0].value
  }

  return data.map((it) => ({
    id: it.id,
    hddCapacity: Number(it.hdd_capacity),
    systemName: it.system_name,
    type: getTypeValue(it.type)
  }))
}

export async function getDevices(): Promise<DeviceWithId[]> {
  let response: DeviceWithId[] = [];
  try {
    const dataApi = await axios.get(`${URL}/devices`);
    response = normalizeData(dataApi.data);
  } catch (e) {
    console.log('Error', e?.message)
  }

  return response;
}

export async function getDevice(id: string): Promise<DeviceApi> {
  let response;
  try {
    response = await axios.get(`${URL}/devices/${id}`);
  } catch (e) {
    console.log('Error', e?.message)
  }

  return response?.data;
}

export async function addDevice({systemName, type, hddCapacity}: Device): Promise<DeviceApi> {
  let response;
  try {
    response = await axios.post(`${URL}/devices`, {
      system_name: systemName,
      type,
      hdd_capacity: hddCapacity
    });
  } catch (e) {
    console.log('Error', e?.message)
  }

  return response?.data;
}

export async function updateDevice({id, systemName, type, hddCapacity}: DeviceWithId): Promise<number> {
  let response;
  try {
    response = await axios.put(`${URL}/devices/${id}`, {
      system_name: systemName,
      type,
      hdd_capacity: hddCapacity
    });
  } catch (e) {
    console.log('Error', e?.message)
  }

  return response?.data;
}

export async function deleteDevice(id: string): Promise<number> {
  let response;
  try {
    response = await axios.delete(`${URL}/devices/${id}`);
  } catch (e) {
    console.log('Error', e?.message)
  }

  return response?.data;
}
