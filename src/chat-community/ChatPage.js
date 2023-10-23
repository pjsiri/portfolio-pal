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
import { useDarkMode } from "../common/darkmode/DarkModeContext";
import { getFirestore, collection, addDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import styles from "./ChatPage.style";

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const [userProfileImage, setUserProfileImage] = useState(null);
  const [page, setPage] = useState(1);
  const [messagesPerPage, setMessagesPerPage] = useState(10);
  const firestore = getFirestore();
  const messagesRef = collection(firestore, "messages");
  const auth = getAuth();
  const user = auth.currentUser;
  const { isDarkMode } = useDarkMode();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // Set the user's profile image
      if (user.photoURL) {
        setUserProfileImage(user.photoURL);
      }
      else
      {
        setUserProfileImage("https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/default_profile.png");
      }
    }
  });

  const sendMessage = async () => {
    if (message.trim() !== "") {
      await addDoc(messagesRef, {
        content: message,
        sender: user.displayName, // Username for the user.
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
          .sort((a, b) => b.timestamp - a.timestamp);
  
        // Apply pagination
        const startIndex = (page - 1) * messagesPerPage;
        const endIndex = startIndex + messagesPerPage;
        const paginatedMessages = updatedMessages.slice(startIndex, endIndex);
  
        setMessages(paginatedMessages);
      }
    );
  
    return () => unsubscribe();
  }, [page]);

  return (
    <View style={[styles.container, isDarkMode ? { backgroundColor: "#333" } : null]}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.cardContainer, isDarkMode ? { backgroundColor: "#404040" } : null]}>
            <View style={styles.messageContainer}>
              <Image
                source= {{url: userProfileImage}} 
                style={styles.avatar}
              />
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
      <TouchableOpacity onPress={() => setPage(page - 1)} disabled={page === 1}>
        <Ionicons name="arrow-back-outline" size={24} color={isDarkMode ? "#fff" : "black"} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setPage(page + 1)} disabled={messages.length < messagesPerPage}>
        <Ionicons name="arrow-forward-outline" size={24} color={isDarkMode ? "#fff" : "black"} />
      </TouchableOpacity>
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