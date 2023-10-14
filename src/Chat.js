import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Button, ScrollView, TouchableOpacity, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


const Chat = () => {
  const navigation = useNavigation();
  const [inputText, setInputText] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const openaiAPIKey = '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';

  const apiUrl = 'https://api.openai.com/v1/chat/completions';

  const scrollViewRef = useRef();

  const handleBack = () => {
    navigation.goBack();
  };

  const sendMessage = async (message) => {
    if (message.trim() === '') {
      return;
    }

    const userMessage = { role: 'user', content: message };
    const newChatHistory = [...chatHistory, userMessage];
    setChatHistory(newChatHistory);
    setIsTyping(true); 

    try {
      const response = await axios.post(apiUrl, {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          userMessage,
        ],
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openaiAPIKey}`,
        },
      });

      const aiMessage = { role: 'ai', content: response.data.choices[0].message.content };
      const updatedChatHistory = [...newChatHistory, aiMessage];
      setChatHistory(updatedChatHistory);
      setIsTyping(false); 
    } catch (error) {
      console.error('Error:', error);
      if (error.response) {
        console.error('Error Response:', error.response.data);
      }
      setIsTyping(false); 
    }
  };

  const scrollToBottom = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const predefinedQuestions = [
    "How do I invest in stocks?",
    "How hard is it to invest",
    "How much are Tesla Stocks?",
    "Who is the owner of Tesla",
  ];

  const handlePredefinedQuestionClick = (question) => {
    sendMessage(question);
  };

  return (
<View style={styles.container}>
  <View style={styles.header}>
    <TouchableOpacity
      style={styles.backButtonContainer}
      onPress={handleBack}
    >
      <Image
        source={{
          uri: "https://github.com/ErickLao123/2023-S2-51-AIVestor/raw/main/assets/back.png",
        }}
        style={styles.backButtonIcon}
      />
    </TouchableOpacity>
    <Text style={styles.title}>AIVestor</Text>
  </View>

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.chatContainer}
      >
        {chatHistory.map((message, index) => (
          <Text key={index} style={message.role === 'user' ? styles.userMessage : styles.aiMessage}>
            {message.content}
          </Text>
        ))}
        {isTyping && (
          <Text style={styles.aiMessage}>Typing...</Text>
        )}
      </ScrollView>
      <View style={styles.predefinedQuestionsContainer}>
        {predefinedQuestions.map((question, index) => (
          <TouchableOpacity
            key={index}
            style={styles.predefinedQuestionBubble}
            onPress={() => handlePredefinedQuestionClick(question)}
          >
            <Text style={styles.predefinedQuestionText}>{question}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Send a message..."
          value={inputText}
          onChangeText={setInputText}
        />
        <Button title="Send" onPress={() => sendMessage(inputText)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', 
    marginBottom: 20,
    marginTop: 100, 
  },
  backButtonContainer: {
    position: 'absolute',
    right: 225,
  },
  backButtonIcon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  chatContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#bfe4e2',
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#d3d3d3',
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '75%',
    marginTop: 10,
    marginBottom: 40,
  },
  input: {
    flex: 4,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
  },
  predefinedQuestionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 25,
  },
  predefinedQuestionBubble: {
    backgroundColor: '#bfe4e2',
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },
  predefinedQuestionText: {
    fontSize: 12,
  },
});

export default Chat;
