import axios from 'axios';
import {Device} from "./types/device";

const URL = 'http://localhost:3000';

export async function getDevices(): Promise<Device[]> {
  let response;
  try {
    response = await axios.get(`${URL}/devices`);
  } catch (e) {
    console.log('Error', e)
  }

  return response?.data;
}

export async function getDevice(id: string): Promise<Device> {
  let response;
  try {
    response = await axios.get(`${URL}/devices/${id}`);
  } catch (e) {
    console.log('Error', e)
  }

  return response?.data;
}

export async function addDevice({system_name, type, hdd_capacity}: Device): Promise<Device> {
  let response;
  try {
    response = await axios.post(`${URL}/devices`, {
      system_name,
      type,
      hdd_capacity
    });
  } catch (e) {
    console.log('Error', e)
  }

  return response?.data;
}

export async function updateDevice({id, system_name, type, hdd_capacity}: Device): Promise<Device> {
  let response;
  try {
    response = await axios.put(`${URL}/devices/${id}`, {
      system_name,
      type,
      hdd_capacity
    });
  } catch (e) {
    console.log('Error', e)
  }

  return response?.data;
}

export async function deleteDevice(id: string): Promise<Device> {
  let response;
  try {
    response = await axios.delete(`${URL}/devices/${id}`);
  } catch (e) {
    console.log('Error', e)
  }

  return response?.data;
}
