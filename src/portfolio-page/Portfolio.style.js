import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  darkModeContainer: {
    backgroundColor: "#333",
  },

  appContainer: {
    flex: 1,
    padding: 10,
    paddingTop: 50,
    width: "100%",
    backgroundColor: "#F0F0F0",
  },

  walletButton: {
    backgroundColor: "black",
    borderRadius: 50,
    padding: 15,
    alignSelf: "center",
    alignItems: "center",
    width: 190,
    justifyContent: "space-evenly",
    marginBottom: 20,
  },

  walletButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },

  portfolioTitleContainer: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 100,
    alignSelf: "center",
    alignItems: "center",
    marginBottom: 20,
  },

  graphContainer: {
    backgroundColor: "white",
    alignItems: "center",
    borderWidth: 5,
    borderRadius: 20,
    width: "100%",
    height: 270,
    marginBottom: 30,
  },

  graphButtonsContainer: {
    backgroundColor: "black",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-around",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 15,
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    top: -5,
  },

  graphButton: (selected) => ({
    backgroundColor: selected ? "white" : "black",
    paddingHorizontal: 15,
    marginHorizontal: 10,
    height: "75%",
    borderRadius: 20,
    justifyContent: "center",
  }),

  graphButtonText: (selected) => ({
    color: selected ? "black" : "white",
    fontSize: 16,
    fontWeight: "500",
  }),

  assetContainer: {
    backgroundColor: "#F0F0F0",
    padding: 16,
    borderWidth: 5,
    borderRadius: 20,
    width: "100%",
    marginBottom: 30,
  },

  sectionContainer: {
    backgroundColor: "white",
    width: "100%",
    padding: 16,
    marginBottom: 16,
    borderRadius: 20,
  },

  headerText: {
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#007AFF",
  },

  valueText: {
    fontSize: 18,
    marginBottom: 8,
  },

  investmentCardsContainer: {
    backgroundColor: "#F0F0F0",
    borderWidth: 5,
    borderRadius: 20,
    width: "100%",
    paddingTop: 16,
    marginBottom: 30,
  },
});

export default styles;
