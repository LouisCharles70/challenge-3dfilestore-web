import axios from 'axios';

//-----------------------------------------------------------------------------
export type ObjFile = {
  id: string;
  name: string;
  creation_date: Date;
  size: number;
  url: string;
};

//-----------------------------------------------------------------------------
type Vector3 = {
  x: number;
  y: number;
  z: number;
};

const apiClient = axios.create({ baseURL: 'http://localhost:3333' });

//-----------------------------------------------------------------------------
export async function listFiles(): Promise<ObjFile[]> {
  const res = await apiClient.request<ObjFile[]>({
    method: 'GET',
    url: 'http://localhost:3333/list-files',
  });
  return res.data;
}

//-----------------------------------------------------------------------------
export async function getFile(fileId: string): Promise<ObjFile> {
  const res = await apiClient.request<ObjFile>({
    method: 'GET',
    url: 'get-file/' + fileId,
  });
  return res.data;
}

//-----------------------------------------------------------------------------
export async function renameFile(fileId: string, newName: string): Promise<ObjFile> {
  const res = await apiClient.request<ObjFile>({
    method: 'PATCH',
    url: '/rename-file/' + fileId,
    data: {
      fileName: newName,
    },
  });
  return res.data;
}

//-----------------------------------------------------------------------------
export async function deleteFile(fileId: string): Promise<void> {
  await apiClient.request<ObjFile>({
    method: 'DELETE',
    url: '/delete-file/' + fileId,
  });
}

//-----------------------------------------------------------------------------
export function downloadFile(downloadUrl: string): void {
  window.open(downloadUrl, '_blank');
}

//-----------------------------------------------------------------------------
export async function uploadFile(data: FormData): Promise<ObjFile> {
  const res = await apiClient.request<ObjFile>({
    method: 'POST',
    url: '/upload-file',
    data,
  });
  return res.data;
}

//-----------------------------------------------------------------------------
export async function transformFile(fileId: string, scale: Vector3, offset: Vector3): Promise<void> {
  const transformUrl =
    'http://localhost:3333/transform-file/' +
    fileId +
    '?scale=' +
    JSON.stringify(scale) +
    '&offset=' +
    JSON.stringify(offset);

  window.open(transformUrl, '_blank');
}
