import { useLocalSearchParams, useRouter } from "expo-router"
import React, { useState, useEffect, useRef } from "react"
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"
import api from "@/services/api"
import { grey } from "@/constants/Colors"
import SockJS from 'sockjs-client';
import Stomp from '@stomp/stompjs';

const Chats = () => {
  const router = useRouter()
  const { otherUserEmail, userId } = useLocalSearchParams()
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const flatListRef = useRef(null)
  const fadeAnim = useRef(new Animated.Value(0)).current
  const websocketRef = useRef(null)
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    // Create SockJS and Stomp client
    const socket = new SockJS('http://192.168.0.137:8080/ws');
    const client = Stomp.over(socket);

    client.connect({}, (frame) => {
      console.log('Connected: ', frame);
      
      // Subscribe to messages
      client.subscribe('/topic/public', (message) => {
        const receivedMessage = JSON.parse(message.body);
        
        // Process and add message to state
        const formattedMessage = {
          id: receivedMessage.id || Date.now().toString(),
          content: receivedMessage.content,
          senderEmail: receivedMessage.senderEmail,
          receiverEmail: receivedMessage.receiverEmail,
          timestamp: new Date(receivedMessage.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        setMessages((prevMessages) => [...prevMessages, formattedMessage]);
      });
    }, (error) => {
      console.error('Connection error: ', error);
    });

    setStompClient(client);

    // Cleanup
    return () => {
      if (client) {
        client.disconnect();
      }
    };
  }, []);

  const sendMessage = () => {
    if (!newMessage.trim() || !stompClient) return;

    stompClient.send("/app/chat.sendMessage", {}, JSON.stringify({
      type: 'CHAT_MESSAGE',
      content: newMessage,
      senderEmail: "self", // Replace with actual sender email
      receiverEmail: otherUserEmail,
      timestamp: new Date().toISOString()
    }));

    // Optimistic UI update
    const optimisticMessage = {
      id: Date.now().toString(),
      content: newMessage,
      senderEmail: "self",
      receiverEmail: otherUserEmail,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    
    setMessages((prevMessages) => [...prevMessages, optimisticMessage]);
    setNewMessage("");
    flatListRef.current?.scrollToEnd({ animated: true });
  }

  const renderMessage = ({ item, index }) => (
    <Animated.View
      style={[item.senderEmail === "self" ? styles.selfBubble : styles.otherBubble, { opacity: fadeAnim }]}
    >
      <Text style={styles.messageText}>{item.content}</Text>
      <Text style={styles.timestamp}>{item.timestamp}</Text>
    </Animated.View>
  )

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#007AFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{otherUserEmail}</Text>
        </View>
        {messages.length > 0 ? (
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.messageList}
          />
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No messages yet</Text>
          </View>
        )}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message"
            value={newMessage}
            onChangeText={setNewMessage}
            placeholderTextColor="#999"
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Ionicons name="send" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F0F2F5",
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    backgroundColor: "#FFFFFF",
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  messageList: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateText: {
    fontSize: 16,
    color: "#999",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#E5E5E5",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "#007AFF",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  selfBubble: {
    backgroundColor: "#007AFF",
    alignSelf: "flex-end",
    borderRadius: 20,
    borderBottomRightRadius: 5,
    marginVertical: 5,
    maxWidth: "80%",
    padding: 10,
  },
  otherBubble: {
    backgroundColor: grey,
    alignSelf: "flex-start",
    borderRadius: 20,
    borderBottomLeftRadius: 5,
    marginVertical: 5,
    maxWidth: "80%",
    padding: 10,
  },
  messageText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: "#FFFFFF80",
    marginTop: 5,
    textAlign: "right",
  },
})

export default Chats

