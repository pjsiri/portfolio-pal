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
    backgroundColor: "#333",
  },
  headerContainer: {
    width: 200,
    flexDirection: "row",
    paddingVertical: 15,
    //backgroundColor: "grey",
  },

  container: {
    marginBottom: 10,
    alignItems: "center",
  },

  backButton: {
    flexDirection: "row",
    width: 100,
    height: 40,
    backgroundColor: "lightgrey",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },

  backButtonText: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: 20,
  },

  inputIcon: {
    width: 16,
    height: 15,
    marginRight: 3,
    marginLeft: -10,
  },

  graphContainer: {
    alignItems: "center",
    borderWidth: 5,
    width: "100%",
    height: 270,
  },

  graphButtonsContainer: {
    backgroundColor: "black",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 15,
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    top: -20,
  },

  graphButton: (selected) => ({
    backgroundColor: selected ? "white" : "black",
    paddingHorizontal: 15,
    marginHorizontal: 5,
    height: "75%",
    borderRadius: 20,
    justifyContent: "center",
  }),

  graphButtonText: (selected) => ({
    color: selected ? "black" : "white",
    fontSize: 16,
    fontWeight: "500",
  }),

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
    width: 130,
    height: 130,
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
