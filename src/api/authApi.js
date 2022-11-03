import { fetchJsonLogin } from '../utils/fetchJson';

export default async function login(username, password) {
  try {
    const result = await fetchJsonLogin('POST', 'driver-auth/auth/login', {
      username,
      password
    });
    return result;
  } catch (error) {
    throw error;
  }
}

export async function submitLocation(data) {
  try {
    const result = await fetchJsonLogin('POST', 'driver-auth/auth/location', data);
    return result;
  } catch (error) {
    throw error;
  }
}
