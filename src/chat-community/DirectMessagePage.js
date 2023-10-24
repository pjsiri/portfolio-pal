import React, { useState, useEffect } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./DirectMessagePage.style";
import cardStyles from "./ChatPage.style";
import { useDarkMode } from "../common/darkmode/DarkModeContext";
import { getFirestore, collection, addDoc, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const DirectMessagePage = ({ route }) => {
  const { username, avatar, uid } = route.params;
  const navigation = useNavigation();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const firestore = getFirestore();
  const directMessagesRef = collection(firestore, "directMessages");
  const auth = getAuth();
  const user = auth.currentUser;
  const { isDarkMode } = useDarkMode();

  const handleGoBack = () => {
    navigation.navigate('Chat'); 
  };
  
  const sendMessage = async () => {
    if (message.trim() !== '') {
      const newMessage = {
        content: message,
        sender: user.uid,
        senderName : username,
        uid: uid,
        avatar: user.photoURL,
        timestamp: new Date(),
      };

      try {
        await addDoc(directMessagesRef, newMessage);
        setMessage('');
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  useEffect(() => {
    const q = query(
      directMessagesRef,
      where("sender", "==", user.uid),
      where("uid", "==", uid),
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedMessages = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedMessages.push({ id: doc.id, ...data });
      });
      fetchedMessages.sort((a, b) => b.timestamp - a.timestamp);
      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, []);

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
    <View style={styles.container}>
      <View style={styles.topRow}>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
              <Ionicons name="chevron-back-outline" size={42} color="black" />
          </TouchableOpacity>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[cardStyles.cardContainer, isDarkMode ? { backgroundColor: "#404040" } : null]}>
            <View style={cardStyles.messageContainer}>
            <View style={cardStyles.profileImageBorder}>
                <Image
                  source={{
                    uri: item.avatar || 'https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/default_profile.png',
                  }}
                  style={cardStyles.avatar}
                />
            </View>
            <View style={cardStyles.messageContent}>
              <Text style={[cardStyles.sender, isDarkMode ? { color: "#fff" } : null]}>{user.displayName}:</Text>
                <Text style={[cardStyles.message, isDarkMode ? { color: "#fff" } : null]}>{item.content}</Text>
                <Text style={[cardStyles.timestamp, isDarkMode ? { color: "#fff" } : null]}> {item.timestamp && new Date(item.timestamp.toDate()).toLocaleString()}
              </Text>
              </View>
            </View>
          </View>
        )}
      />

      <View style={styles.userInfoContainer}>
        <Image source={{ uri: avatar }} style={styles.avatar} />
        <Text style={styles.username}>{username}</Text>
      </View>
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Type your message..."
        style={styles.input}
      />
      <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
        <Text style={styles.sendButtonText}>Send</Text>
      </TouchableOpacity>
    </View>
    </KeyboardAvoidingView>
  );
};

export default DirectMessagePage;