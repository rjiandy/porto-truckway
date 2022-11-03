import { fetchJson } from '../utils/fetchJson';

export default async function shipmentPlanApi() {
  try {
    const result = await fetchJson('GET', 'shipments');
    return result;
  } catch (error) {
    throw error;
  }
}

export async function startShipmentApi(payload) {
  try {
    const result = await fetchJson('POST', 'driver/start', payload);
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getShipmentFinalPrice(payload) {
  try {
    const result = await fetchJson('POST', 'shipments/final-prices', payload);
    return result;
  } catch (error) {
    throw error;
  }
}
