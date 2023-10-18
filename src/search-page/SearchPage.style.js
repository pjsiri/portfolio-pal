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

  sortContainer: {
    backgroundColor: "black",
    flexDirection: "row",
    alignSelf: "center",
    width: "100%",
    height: 53,
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: 25,
    marginTop: 20,
    marginBottom: 15,
  },

  sortBy: {
    borderColor: "white",
    paddingHorizontal: 15,
  },
  sortButton: (selected) => ({
    backgroundColor: selected ? "white" : "black",
    paddingHorizontal: 15,
    marginHorizontal: 5,
    height: "75%",
    borderRadius: 20,
    justifyContent: "center",
  }),

  sortText: (selected) => ({
    color: selected ? "black" : "white",
    fontSize: 16,
    fontWeight: "500",
  }),

  unitTest: {
    height: 0,
  },
});

export default styles;
