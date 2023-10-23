import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
    paddingTop: 150,
  },
  messageContainer: {
    marginBottom: 8,
  },
  messageBubble: {
    padding: 8,
    borderRadius: 8,
    maxWidth: '80%',
  },
  messageText: {
    fontSize: 16,
  },
  topRow: {
    position: 'absolute',
    top: 65, 
    left: 6, 
    flexDirection: 'row',
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    color: 'blue',
    fontWeight: 'bold',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
  },
  username: {
    fontSize: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
  },
  sendButton: {
    backgroundColor: '#007BFF',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default styles;
