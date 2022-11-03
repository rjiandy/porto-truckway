import { fetchJson, fetchBase64 } from '../utils/fetchJson';

export default async function submitDoApi(payload) {
  try {
    const result = await fetchJson('POST', 'shipments', payload);
    return result;
  } catch (error) {
    throw error;
  }
}

export async function uploadFileBase64(data) {
  try {
    const result = await fetchBase64('POST', 'uploadbase64', data);
    return result;
  } catch (err) {
    throw err;
  }
}
