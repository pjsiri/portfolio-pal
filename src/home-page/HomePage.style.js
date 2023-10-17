import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  darkModeContainer: {
    backgroundColor: "#333333",
  },

  darkModeText: {
    color: "white",
  },

  appContainer: {
    flex: 1,
    width: "100%",
    backgroundColor: "#F0F0F0",
    padding: 15,
    paddingTop: 30,
  },

  headerContainer: {
    // backgroundColor: "#252525",
    backgroundColor: "white",
    flexDirection: "row",
    paddingVertical: 15,
    justifyContent: "center",
    borderRadius: 50,
    marginBottom: 15,
    borderColor: "black",
    borderTopWidth: 10,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 10,
  },

  appLogo: {
    width: 50,
    height: 50,
    left: -28,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
  },

  appName: {
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "bold",
    fontSize: 38,
    color: "black",
    left: -10,
  },

  bookmarkContainer: {
    // backgroundColor: "#008000",
    backgroundColor: "",
    flexDirection: "row",
    borderRadius: 25,
    padding: 15,
    alignSelf: "center",
    width: 200,
    justifyContent: "space-evenly",
  },

  bookmarkIcon: {
    width: 22,
    height: 22,
  },

  bookmarkText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },

  header: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 30,
    paddingTop: 20,
    paddingBottom: 20,
    color: "black",
  },
});

export default styles;
