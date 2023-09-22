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

  graphContainer: {
    backgroundColor: "lightgrey",
    width: "100%",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
  },

  bookmarkContainer: {
    padding: 10,
    alignItems: "center",
  },

  buyContainer: {
    width: "100%",
    margin: 5,
    backgroundColor: "#0096FF",
    padding: 10,
    borderRadius: 10,
  },

  sellContainer: {
    width: "100%",
    margin: 5,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 10,
  },

  buySellText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },

  detailContainer: {
    margin: 10,
    padding: 10,
    flexDirection: "row",
    //backgroundColor: "lightgrey",
  },

  priceDetailContainer: {
    flex: 1,
    alignItems: "center",
    //backgroundColor: "grey",
  },

  logoImage: {
    width: 100,
    height: 100,
    marginTop: 20,
    marginBottom: 10,
  },

  heartImage: {
    width: 30,
    height: 30,
  },

  aboutText: {
    marginBottom: 10,
    padding: 10,
    textAlign: "justify",
  },
});

export default styles;
