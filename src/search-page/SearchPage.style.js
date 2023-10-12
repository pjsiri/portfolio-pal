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

  searchOuterContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  searchContainer: {
    flex: 11,
    marginBottom: 50,
    borderRadius: 50,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginRight: 20,
  },

  searchIcon: {
    width: 25,
    height: 25,
    marginLeft: 20,
  },

  searchBar: {
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

  filterButton: {
    flex: 1,
    width: 50,
    height: 50,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },

  filterIcon: {
    width: 35,
    height: 35,
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
