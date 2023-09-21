import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 15,
    paddingTop: 50,
    width: "100%",
    backgroundColor: "#F0F0F0",
  },

  headerContainer: {
    width: 200,
    flexDirection: "row",
    paddingVertical: 15,
    //backgroundColor: "grey",
  },

  container: {
    marginBottom: 10,
    padding: 10,
    alignItems: "center",
  },

  backButton: {
    width: 100,
    height: 40,
    backgroundColor: "lightgrey",
    justifyContent: "center",
    borderRadius: 10,
  },

  backButtonText: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: 20,
  },
});

export default styles;
