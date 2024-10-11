import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchWorkerData = async () => {
  try {
    const token = await AsyncStorage.getItem('token'); // Retrieve token from AsyncStorage
    const response = await fetch('http://192.168.1.3:8080/worker/mydata', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Worker data response:', response);

    if (!response.ok) {
      throw new Error('Failed to fetch worker data');
    }

    const data = await response.json();
    return data; // Return the retrieved data
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error for handling in the component
  }
};

export const fetchClientData = async () => {
    try {
      const token = await AsyncStorage.getItem('token'); // Retrieve token from AsyncStorage
      const response = await fetch('http://192.168.1.3:8080/client/mydata', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      console.log('Worker data response:', response);
  
      if (!response.ok) {
        throw new Error('Failed to fetch worker data');
      }
  
      const data = await response.json();
      return data; // Return the retrieved data
    } catch (error) {
      console.error(error);
      throw error; // Re-throw the error for handling in the component
    }
  };