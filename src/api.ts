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
