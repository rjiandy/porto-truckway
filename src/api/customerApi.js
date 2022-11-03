import { fetchJson } from '../utils/fetchJson';

export async function startVisitApi(payload) {
  try {
    const result = await fetchJson('POST', 'driver/visit', payload);
    return result;
  } catch (error) {
    throw error;
  }
}
