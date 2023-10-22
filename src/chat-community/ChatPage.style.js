import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F5F5F5",
    paddingTop: 70,
    },
    messageContainer: {
    marginBottom: 8,
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
});

export default styles;