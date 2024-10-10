import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const TestLogin = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch users from the backend API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://192.168.1.3:8010/user');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Handle test login
  const handleTestLogin = async (user) => {
    setIsLoading(true);
    
    try {
      const response = await axios.post('http://192.168.1.3:8010/auth/signin', {
        username: user.username, // Use the username from the selected user
        password: user.password  // Assuming you have a test password for each user (use cautiously)
      });

      console.log('Sign in response:', response.data);

      if (response.data.token) {
        await AsyncStorage.setItem('token', response.data.token);
        console.log('Token saved:', response.data.token);
        router.push(response.data.redirectUrl);
      }
    } catch (error) {
      console.error('Error signing in:', error.response ? error.response.data : error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView>
      <View>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
          Test Login as User:
        </Text>
        <View className='flex flex-col gap-2'>
        {users.map((user) => (
          <TouchableOpacity
            className='bg-blue-500 py-2 px-4 rounded-md'
            key={user._id}
            onPress={() => handleTestLogin(user)}
            disabled={isLoading}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              {user.name || user.username}
            </Text>
          </TouchableOpacity>
        ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default TestLogin;
