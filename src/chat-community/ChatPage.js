import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getFirestore, collection, addDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import styles from "./ChatPage.style";

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const firestore = getFirestore();
  const messagesRef = collection(firestore, "messages");
  const auth = getAuth();
  const user = auth.currentUser;

  const sendMessage = async () => {
    if (message.trim() !== "") {
      await addDoc(messagesRef, {
        content: message,
        sender: user.uid, // Replace with actual sender ID
        timestamp: serverTimestamp(),
      });
      setMessage("");
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(messagesRef, (querySnapshot) => {
      const updatedMessages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(updatedMessages);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text style={styles.sender}>{item.sender}:</Text>
            <Text style={styles.message}>{item.content}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message..."
          style={styles.input}
        />
        <TouchableOpacity onPress={sendMessage}>
          <Text style={styles.sendButton}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatPage;