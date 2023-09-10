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

  headerBtn: {
    fontSize: 15,
    color: "grey",
  },

  cardsContainer: {
    marginTop: 10,
  },
});

export default styles;
