import axios from 'axios';
import {Device} from "./types/device";

const URL = 'http://localhost:3000';

export async function getDevices(): Promise<Device[]> {
  let response;
  try {
    response = await axios.get(`${URL}/devices`);
  } catch (e) {
    console.log('Error', e?.message)
  }

  return response?.data;
}

export async function getDevice(id: string): Promise<Device> {
  let response;
  try {
    response = await axios.get(`${URL}/devices/${id}`);
  } catch (e) {
    console.log('Error', e?.message)
  }

  return response?.data;
}

export async function addDevice({systemName, type, hddCapacity}: Device): Promise<Device> {
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

export async function updateDevice({id, systemName, type, hddCapacity}: Device): Promise<Device> {
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

export async function deleteDevice(id: string): Promise<Device> {
  let response;
  try {
    response = await axios.delete(`${URL}/devices/${id}`);
  } catch (e) {
    console.log('Error', e?.message)
  }

  return response?.data;
}
