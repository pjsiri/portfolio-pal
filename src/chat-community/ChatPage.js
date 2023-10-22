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
import { getFirestore, collection, addDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import styles from "./ChatPage.style";

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const [userProfileImage, setUserProfileImage] = useState(null);
  const firestore = getFirestore();
  const messagesRef = collection(firestore, "messages");
  const auth = getAuth();
  const user = auth.currentUser;

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
          .sort((a, b) => b.timestamp - a.timestamp); // Sort by timestamp in descending order
        setMessages(updatedMessages);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <View style={styles.messageContainer}>
              <Image
                source= {{url: userProfileImage}} 
                style={styles.avatar}
              />
              <View style={styles.messageContent}>
                <Text style={styles.sender}>{item.sender}:</Text>
                <Text style={styles.message}>{item.content}</Text>
                <Text style={styles.timestamp}>
                  {new Date(item.timestamp.toDate()).toLocaleString()}
                </Text>
              </View>
            </View>
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