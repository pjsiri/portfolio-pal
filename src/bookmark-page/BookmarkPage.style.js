import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
      },
      inputIcon: {
        width: 24,
        height: 24,
        marginRight: 8,
      },
      backButtonContainer: {
        position: 'absolute',
        top: 80,
        left: 20,
      },
      backButton: {
        width: 30,
        height: 30,
        tintColor: "black",
      },
      title: {
        fontSize: 24,
        marginBottom: 15,
        color:"black",
      },
      appContainer: {
        flex: 1,
        padding: 15,
        paddingTop: 50,
        width: "100%",
        backgroundColor: "white", // whote
      },
      header: {
        fontWeight: "bold",
        fontSize: 30,
        paddingTop: 20,
        paddingBottom: 20,
        color:  "Black",
      },
      stocks: {
        paddingTop: 20,
        paddingBottom: 20,
      },
      tabButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
      },
      tabButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginHorizontal: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
      },
      activeTabButton: {
        backgroundColor: '#007bff',
        borderColor: '#007bff',
      },
      tabButtonText: {
        color: '#333',
        fontWeight: 'bold',
      },
});

export default styles;
