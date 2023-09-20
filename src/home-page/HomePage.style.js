import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    paddingVertical: 15,
    justifyContent: "space-between",
  },

  appContainer: {
    flex: 1,
    padding: 15,
    paddingTop: 50,
    width: "100%",
    backgroundColor: "#F0F0F0",
  },

  darkModeContainer: {
    backgroundColor: "#333333",
  },
  
  appName: {
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "bold",
    fontSize: 25,
    color: "black", 
  },

  header: {
    fontWeight: "bold",
    fontSize: 30,
    paddingTop: 20,
    paddingBottom: 20,
    color: "black",
  },

  appLogo: {
    width: 60,
    height: 60,
  },

  modeIcon: {
    width: 50,
    height: 50,
  },

  darkModeText: {
    color: "white",
  },
});

export default styles;