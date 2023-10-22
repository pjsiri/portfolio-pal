import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
    paddingTop: 80,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  transactionItem: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  transactionType: {
    fontSize: 18,
    marginBottom: 5,
  },
  transactionAmount: {
    fontSize: 16,
  },
  transactionCard: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  transactionDetails: {
  },
  transactionType: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  transactionHistory: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  balance: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 3,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default styles;
