import { grey, lightblue } from '@/constants/Colors';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import api from '@/services/api'; // Make sure api.js or api.ts is set up with axios
import * as SecureStore from 'expo-secure-store';

const RecentChats = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch the chats from the API
  const fetchChats = async () => {
    try {
      const token = await SecureStore.getItemAsync('userId'); // Retrieve the JWT token
      if (!token) {
        Alert.alert('Error', 'Authentication token not found.');
        return;
      }

      const response = await api.get(`/api/inboxes/user/{userId}?userId=${token}`);

      if (response.status === 200) {
        setChats(response.data); // Assuming the response has a list of chats
      } else {
        Alert.alert('Error', 'Failed to fetch chats.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again later.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChats(); // Fetch chats on component mount
  }, []);

  // Render individual chat item
  const renderChatItem = ({ item }) => {
    const lastMessage = item.messages && item.messages.length > 0 ? item.messages[0].content : 'No messages yet';
    const otherUser = item.user1.id !== item.user2.id ? item.user1 : item.user2; // Show the other user's name
    return (
      <TouchableOpacity
        style={styles.chatItem}
        onPress={() => navigation.navigate('ChatScreen', { chatId: item.id })}
      >
        <View style={styles.chatDetails}>
          <Text style={styles.chatName}>{otherUser.name}-{otherUser.email}</Text>
          <Text style={styles.lastMessage}>{lastMessage}</Text>
        </View>
        <Text style={styles.time}>
          {item.messages && item.messages.length > 0
            ? new Date(item.messages[0].createdAt).toLocaleTimeString()
            : ''}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recent Chats</Text>
      {loading ? (
        <Text>Loading...</Text> // You can replace this with an ActivityIndicator
      ) : chats.length === 0 ? (
        <Text>No recent chats</Text>
      ) : (
        <FlatList
          data={chats}
          renderItem={renderChatItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.chatList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
    backgroundColor: lightblue,
    color: grey,
    textAlign: 'center',
  },
  chatList: {
    paddingHorizontal: 10,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  chatDetails: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lastMessage: {
    color: '#555',
    marginTop: 2,
  },
  time: {
    fontSize: 12,
    color: '#888',
  },
});

export default RecentChats;
