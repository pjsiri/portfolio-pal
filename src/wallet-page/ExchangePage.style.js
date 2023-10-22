import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
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
  balance: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 3,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default styles;
