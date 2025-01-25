import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';

// Types
interface Message {
  id?: number;
  content: string;
  senderEmail: string;
  timestamp?: string;
}

interface ChatScreenProps {
  route: {
    params: {
      receiverEmail: string;
    };
  };
}

const ChatScreen: React.FC<ChatScreenProps> = ({ route }) => {
  const { otherUserEmail, userId } = useLocalSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Fetch Chat History
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = await SecureStore.getItemAsync('jwt');
        if (!token) {
          console.error('Authentication token not found');
          return;
        }

        setIsLoading(true);
        const response = await axios.get(
          encodeURI(`http://192.168.0.105:8080/chat/messages/${otherUserEmail}`),
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching chat history:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, [otherUserEmail]);

  // Send Message
  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    try {
      const token = await SecureStore.getItemAsync('jwt');
      if (!token) {
        console.error('Authentication token not found');
        return;
      }

      const messagePayload = {
        receiverEmail: otherUserEmail,
        content: inputMessage,
      };

      // Send message via API
      await axios.post(
        `http://192.168.0.105:8080/chat/send/${userId}`,
        messagePayload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update local messages
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...messagePayload, senderEmail: userId as string },
      ]);
      setInputMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Render Message Item
  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageBubble,
        item.senderEmail === otherUserEmail ? styles.receivedMessage : styles.sentMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.content}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item, index) => item.id?.toString() || index.toString()}
            contentContainerStyle={styles.messageList}
          />
        )}

        <View style={styles.inputContainer}>
          <TextInput
            value={inputMessage}
            onChangeText={setInputMessage}
            placeholder="Type a message"
            style={styles.input}
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  messageList: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  sentMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  sendButton: {
    justifyContent: 'center',
    backgroundColor: '#007BFF',
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  sendButtonText: {
    color: 'white',
  },
});

export default ChatScreen;
