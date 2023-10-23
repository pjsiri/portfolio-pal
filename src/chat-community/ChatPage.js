import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { getFirestore, collection, addDoc, serverTimestamp, onSnapshot, doc } from "firebase/firestore";
import { useDarkMode } from "../common/darkmode/DarkModeContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import DirectMessagePage from './DirectMessagePage'; 
import styles from "./ChatPage.style";

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const [messagesPerPage, setMessagesPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const firestore = getFirestore();
  const messagesRef = collection(firestore, "messages");
  const auth = getAuth();
  const user = auth.currentUser;
  const [totalPages, settotalPages] = useState(null);
  const { isDarkMode } = useDarkMode();

  const sendMessage = async () => {
    if (message.trim() !== "") {
      await addDoc(messagesRef, {
        content: message,
        sender: user.displayName, // Username for the user.
        uid: user.uid,
        avatar: user.photoURL,  
        timestamp: serverTimestamp(),
      });
      setMessage("");
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, "messages"),
      (querySnapshot) => {
        const updatedMessages = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .sort((a, b) => b.timestamp - a.timestamp) // Descending order
          
        // Apply pagination
        const startIndex = (page - 1) * messagesPerPage;
        const endIndex = startIndex + messagesPerPage;
        const paginatedMessages = updatedMessages.slice(startIndex, endIndex);

        setMessages(paginatedMessages);

        // Calculate total pages once
        if (page === 1) {
          const total = Math.ceil(updatedMessages.length / messagesPerPage);
          settotalPages(total);
        }
      }
    );
  
    return () => unsubscribe();
  }, [page]);

  return (
    <View style={[styles.container, isDarkMode ? { backgroundColor: "#333" } : null]}>
      <Text style={styles.communityName}>PortfolioPal Community</Text> 
      <View style={styles.groupIconsContainer}>
        <View style={styles.groupIcon}>
          <Ionicons name="people" size={24} color="black" />
        </View>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.cardContainer, isDarkMode ? { backgroundColor: "#404040" } : null]}>
            <View style={styles.messageContainer}>
            <View style={styles.profileImageBorder}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('DirectMessage', {
                    uid: item.uid,
                    username: item.sender,
                    avatar: item.avatar || 'https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/default_profile.png',
                  });
                }}
              >
                <Image
                  source={{
                    uri: item.avatar || 'https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/default_profile.png',
                  }}
                  style={styles.avatar}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.messageContent}>
              <Text style={[styles.sender, isDarkMode ? { color: "#fff" } : null]}>{item.sender}:</Text>
                <Text style={[styles.message, isDarkMode ? { color: "#fff" } : null]}>{item.content}</Text>
                <Text style={[styles.timestamp, isDarkMode ? { color: "#fff" } : null]}> {item.timestamp && new Date(item.timestamp.toDate()).toLocaleString()}
              </Text>
              </View>
            </View>
          </View>
        )}
      />

      <View style={styles.paginationContainer}>
        {page !== 1 && (
          <TouchableOpacity onPress={() => setPage(page - 1)}>
            <Ionicons name="arrow-back-outline" size={24} color="black" />
          </TouchableOpacity>
        )}

        {messages.length >= messagesPerPage && page !== totalPages && (
          <TouchableOpacity onPress={() => setPage(page + 1)}>
            <Ionicons name="arrow-forward-outline" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.inputContainer}>
      <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message..."
          style={[
            styles.input,
            isDarkMode ? { borderColor: "#fff", color: "#fff" } : null
          ]}
          placeholderTextColor={isDarkMode ? "#fff" : "black"} 
        />
        <TouchableOpacity onPress={sendMessage}>
          <Text style={styles.sendButton}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatPage;