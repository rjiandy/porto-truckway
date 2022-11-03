import AsyncStorage from '@react-native-community/async-storage';
import Config from 'react-native-config';

async function fetchJson(method, path, data) {
  const token = await AsyncStorage.getItem('@token');

  try {
    const response = await fetch(`${Config.BASE_URL}/${path}`, {
      method,
      headers: {
        Accept: 'application/json',
        Authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    if (response.status !== 200) {
      throw result;
    } else {
      return result;
    }
  } catch (error) {
    throw error;
  }
}

async function fetchJsonLogin(method, path, data) {
  try {
    const token = await AsyncStorage.getItem('@token');
    const response = await fetch(`${Config.BASE_URL_LOGIN}/${path}`, {
      method,
      headers: {
        Accept: 'application/x-www-form-urlencoded',
        Authorization: token,
        app: 'driverapp',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: encodeURI(Object.keys(data).map(key => `${key}=${data[key]}`).join('&'))
    });

    const result = await response.json();
    if (result.status === 400) {
      throw result;
    }
    return result;
  } catch (error) {
    throw error;
  }
}

async function fetchBase64(method, path, data) {
  const token = await AsyncStorage.getItem('@token');

  try {
    const response = await fetch(`${Config.BASE_URL_UPLOAD_64}/${path}`, {
      method,
      headers: {
        Accept: 'application/json',
        Authorization: token,
        'Content-Type': 'application/json',
        app: 'driverapp'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    if (response.status !== 200) {
      throw result;
    } else {
      return result;
    }
  } catch (error) {
    throw error;
  }
}

export {
  fetchJson,
  fetchJsonLogin,
  fetchBase64
};
