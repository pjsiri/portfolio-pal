import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 15,
    paddingTop: 50,
    width: "100%",
    backgroundColor: "#F0F0F0",
  },
  darkModeContainer: {
    backgroundColor: "#333", // Dark mode background color
  },
  searchContainer: {
    marginBottom: 50,
    borderRadius: 50,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  searchIcon: {
    width: 25,
    height: 25,
  },
  searchBar: {
    width: 300,
    height: 50,
    borderRadius: 10,
    borderWidth: 0,
    paddingHorizontal: 10,
  },

  searchButton: {
    width: 70,
    backgroundColor: "black",
    borderRadius: 10,
  },

  searchButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    textAlign: "center",
  },

  appName: {
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "bold",
    fontSize: 25,
  },

  header: {
    //textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    paddingTop: 20,
    paddingBottom: 20,
  },

  modeIcon: {
    width: 50,
    height: 50,
  },
});

export default styles;
