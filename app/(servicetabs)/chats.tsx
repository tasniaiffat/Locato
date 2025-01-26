import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import api from "@/services/api"; // Ensure this is set up with axios
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";

const RecentChats = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newChatEmail, setNewChatEmail] = useState(""); // State for the email input
  const router = useRouter(); // For navigation

  // Fetch the chats from the API
  const fetchChats = async () => {
    try {
      const token = await SecureStore.getItemAsync("userId"); // Retrieve the JWT token
      if (!token) {
        Alert.alert("Error", "Authentication token not found.");
        return;
      }

      const response = await api.get(`/api/inboxes/user/{userId}?userId=${token}`);
      setChats(response.data); // Assuming the response has a `data` array
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChats(); // Fetch chats on component mount
  }, []);

  // Handle starting a new chat
  const startNewChat = async () => {
    if (!newChatEmail.trim()) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    try {
      const senderEmail = await SecureStore.getItemAsync("email"); // Retrieve sender email
      if (!senderEmail) {
        Alert.alert("Error", "Your email is not found.");
        return;
      }

      // Send "hello" message to the new email
      await api.post("/chat/send", {
        senderEmail,
        receiverEmail: newChatEmail.trim(),
        content: "hello",
      });

      // Navigate to the chat screen
      router.push({
        pathname: "/chat-user",
        params: { otherUserEmail: newChatEmail.trim() },
      });

      setNewChatEmail(""); // Clear the input field
    } catch (error) {
      Alert.alert("Error", "Failed to start a new chat. Please try again.");
      console.error(error);
    }
  };

  // Render individual chat item
  const renderChatItem = ({ item }) => {
    const lastMessage =
      item.messages && item.messages.length > 0 ? item.messages[0].content : "No messages yet";
    const otherUser = item.user1.id !== item.user2.id ? item.user1 : item.user2;

    const handleChatPress = () => {
      router.push({
        pathname: "/chat-user",
        params: { otherUserEmail: otherUser.email },
      });
    };

    return (
      <TouchableOpacity style={styles.chatItem} onPress={handleChatPress}>
        <View style={styles.chatDetails}>
          <Text style={styles.chatName}>
            {otherUser.name} - {otherUser.email}
          </Text>
          <Text style={styles.lastMessage}>{lastMessage}</Text>
        </View>
        <Text style={styles.time}>
          {item.messages && item.messages.length > 0
            ? new Date(item.messages[0].createdAt).toLocaleTimeString()
            : ""}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.header}>Recent Chats</Text>
      {loading ? (
        <Text>Loading...</Text> // Replace this with an ActivityIndicator if needed
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
      <View style={styles.newChatContainer}>
        <TextInput
          value={newChatEmail}
          onChangeText={setNewChatEmail}
          placeholder="Enter email to start new chat"
          style={styles.newChatInput}
        />
        <TouchableOpacity onPress={startNewChat} style={styles.newChatButton}>
          <Text style={styles.newChatButtonText}>Start Chat</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 16,
    backgroundColor: "#87CEFA",
    color: "#555",
    textAlign: "center",
  },
  chatList: {
    paddingHorizontal: 10,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  chatDetails: {
    flex: 1,
  },
  chatName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  lastMessage: {
    color: "#555",
    marginTop: 2,
  },
  time: {
    fontSize: 12,
    color: "#888",
  },
  newChatContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  newChatInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  newChatButton: {
    justifyContent: "center",
    backgroundColor: "#007BFF",
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  newChatButtonText: {
    color: "#fff",
  },
});

export default RecentChats;
