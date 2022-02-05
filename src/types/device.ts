export type DeviceApi = {
  id: string;
  system_name: string;
  type: string;
  hdd_capacity: number;
}

export type Device = {
  systemName: string;
  type: string;
  hddCapacity: number;
  isEditing?: boolean;
}

export type DeviceWithId = Device & { id: string; }
