import { grey, lightblue } from '@/constants/Colors';
import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const chats = [
  {
    id: '1',
    name: 'John Doe',
    lastMessage: 'See you tomorrow!',
    time: '10:45 AM',
  },
  {
    id: '2',
    name: 'Jane Smith',
    lastMessage: 'Thanks for the update.',
    time: '9:30 AM',
  },
  {
    id: '3',
    name: 'Specialist Chat',
    lastMessage: 'Your request has been processed.',
    time: '8:15 AM',
  },
];

const RecentChats = ({ navigation }) => {
  const renderChatItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => navigation.navigate('ChatScreen', { chatId: item.id })}
    >
      <View style={styles.chatDetails}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.lastMessage}>{item.lastMessage}</Text>
      </View>
      <Text style={styles.time}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recent Chats</Text>
      <FlatList
        data={chats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        style={styles.chatList}
      />
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
