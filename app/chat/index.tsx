import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const ChatApp = () => {
  const [sender, setSender] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const stompClient = useRef(null);
  const chatName = 'specialist'; // Default channel name
  const isConnected = useRef(false); // Flag to track if the connection is established

  const connect = () => {
    if (isConnected.current) return; // Prevent multiple connections

    const socket = new SockJS('http://10.33.19.104:8080/chat');
    stompClient.current = Stomp.over(socket);
    stompClient.current.connect({}, (frame) => {
      console.log('Connected: ' + frame);
      isConnected.current = true; // Mark as connected
      stompClient.current.subscribe(`/topic/messages/${chatName}`, (messageOutput) => {
        showMessageOutput(JSON.parse(messageOutput.body));
      });
    });
  };

  const showMessageOutput = (messageOutput) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { key: Math.random().toString(), text: `${messageOutput.sender}: ${messageOutput.content}` },
    ]);
  };

  const sendMessage = () => {
    if (!sender || !message) {
      alert('Please fill all fields');
      return;
    }
    stompClient.current.send(
      `/app/chat/send/${chatName}`,
      {},
      JSON.stringify({ sender, content: message })
    );
    setMessage(''); // Clear the message input
  };

  useEffect(() => {
    connect(); // Automatically connect when the component mounts

    return () => {
      // Cleanup: Disconnect the WebSocket when the component unmounts
      if (stompClient.current) {
        stompClient.current.disconnect(() => {
          console.log('Disconnected');
        });
        isConnected.current = false;
      }
    };
  }, []); // Empty dependency array to ensure it runs only once

  return (
    <View style={styles.container}>
      <Text>Chat with the Specialist</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={sender}
        onChangeText={setSender}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter a message"
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Send Message" onPress={sendMessage} />

      <FlatList
        data={messages}
        renderItem={({ item }) => <Text style={styles.message}>{item.text}</Text>}
        keyExtractor={(item) => item.key}
        style={styles.messageArea}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  messageArea: {
    marginTop: 20,
    flex: 1,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  message: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default ChatApp;
