import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

// Color definitions
const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';
export const grey = "#2a323d";
export const lightblue = 'lightblue';
export const background = '#375f6f';

const ChatApp = () => {
  const [sender, setSender] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const stompClient = useRef(null);
  const chatName = 'specialist'; // Default channel name
  const isConnected = useRef(false); // Flag to track if the connection is established

  const connect = () => {
    if (isConnected.current) return; // Prevent multiple connections

    const socket = new SockJS('http://172.20.10.3:8080/chat');
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
      <Text style={styles.header}>Chat with the Specialist</Text>

      <FlatList
        data={messages}
        renderItem={({ item }) => <Text style={styles.message}>{item.text}</Text>}
        keyExtractor={(item) => item.key}
        style={styles.messageArea}
      />

      <KeyboardAvoidingView style={styles.inputArea} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inputContainer}>
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
            <Button title="Send Message" onPress={sendMessage} color={tintColorLight} />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: background,
    justifyContent: 'flex-end', // Ensure the input stays at the bottom
  },
  header: {
    color: tintColorDark,
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  messageArea: {
    padding: 10,
    flex: 1,
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: tintColorDark,
    marginBottom: 10,
  },
  inputArea: {
    backgroundColor: grey,
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'column', // Stack input fields vertically
    justifyContent: 'center',
    alignItems: 'stretch', // Ensure they take up the full width
  },
  input: {
    height: 40,
    width: '100%', // Make input take the full width
    borderColor: tintColorLight,
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    color: tintColorDark,
    backgroundColor: lightblue,
  },
});

export default ChatApp;
