import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    padding: 10,
    //backgroundColor: "lightgrey",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  headerTitleDark: {
    color: "white", // Text color for dark mode
  },
  headerBtn: {
    fontSize: 15,
    color: "grey",
  },
  headerBtnDark: {
    color: "white", // Text color for dark mode
  },
  cardsContainer: {
    marginTop: 10,
  },
  notFoundContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  notFoundIcon: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});

export default styles;
