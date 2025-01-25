import React, { useState, useEffect, useRef } from "react";
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
} from "react-native";
import * as SecureStore from "expo-secure-store";
import api from "@/services/api"; // Using the imported API service
import { useLocalSearchParams } from "expo-router";
import { grey, lightblue } from "@/constants/Colors";

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
  const { otherUserEmail } = useLocalSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const flatListRef = useRef<FlatList>(null);

  // Fetch Chat History
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const requesterEmail = await SecureStore.getItemAsync("email");
        if (!requesterEmail) {
          console.error("Requester email not found");
          return;
        }

        setIsLoading(true);
        // Use the imported API service to make the POST request
        const response = await api.post("/api/inboxes/user", {
          requesterEmail,
          otherUserEmail,
        });

        // Process and sort the messages response based on timestamp
        const fetchedMessages = response.data.messages.map((message: any) => ({
          id: message.id,
          content: message.content,
          timestamp: message.createdAt,
          senderEmail: message.sender.email, // Extract sender email
        }));

        // Sort messages by timestamp to ensure the correct order
        const sortedMessages = fetchedMessages.sort(
          (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );

        setMessages(sortedMessages); // Update state with the sorted messages
      } catch (error) {
        console.error("Error fetching chat history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, [otherUserEmail]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return; // Avoid sending empty messages

    try {
      // Get the sender email from SecureStore
      const senderEmail = await SecureStore.getItemAsync("email");
      if (!senderEmail) {
        console.error("Sender email not found");
        return;
      }

      // Get the receiver email from the route params
      const receiverEmail = otherUserEmail;

      // Define the message payload
      const messagePayload = {
        senderEmail: senderEmail, // The sender email
        receiverEmail: receiverEmail, // The receiver email from route params
        content: inputMessage, // The content of the message typed by the user
      };

      // Make the POST request to send the message using the imported API service
      await api.post("/chat/send", messagePayload);

      // Update local message state with the new message
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, { ...messagePayload, senderEmail }];
        flatListRef.current?.scrollToEnd({ animated: true });
        return updatedMessages;
      });
      setInputMessage(""); // Clear the input field after sending the message
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Render Message Item
  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageBubble,
        item.senderEmail === otherUserEmail
          ? styles.receivedMessage
          : styles.sentMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.content}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item, index) =>
              item.id ? item.id.toString() : `${index}-${item.timestamp}`
            }
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
    backgroundColor: "#F5F5F5",
  },
  messageList: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  sentMessage: {
    backgroundColor: lightblue,
    alignSelf: "flex-end",
  },
  receivedMessage: {
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  sendButton: {
    justifyContent: "center",
    backgroundColor: "#007BFF",
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  sendButtonText: {
    color: "white",
  },
});

export default ChatScreen;
