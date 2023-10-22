import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
    paddingTop: 70,
  },
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
    borderColor: "#000",
    borderWidth: 1,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sender: {
  fontWeight: "bold",
  marginBottom: 4,
  },
  message: {
  fontSize: 16,
  },
  inputContainer: {
  flexDirection: "row",
  alignItems: "center",
  marginTop: 16,
  },
  input: {
  flex: 1,
  height: 40,
  borderWidth: 1,
  borderRadius: 8,
  paddingHorizontal: 8,
  marginRight: 8,
  },
  sendButton: {
  color: "#007BFF",
  fontWeight: "bold",
  },
  messageContent: {
    flex: 1,
  },
  timestamp: {
    color: "#888",
    fontSize: 12,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  paginationButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#007BFF",
    backgroundColor: "#007BFF",
  },
  paginationButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  profileImageBorder: {
    width: 50,
    height: 50,
    borderRadius: 50,
    overflow: "hidden",
    alignSelf: "center",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  }
});

export default styles;