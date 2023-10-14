import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: "center",
  },

  titleText: {
    fontSize: 30,
    fontWeight: "500",
    marginTop: 15,
    marginBottom: 20,
  },

  contentContainer: {
    paddingBottom: 20,
    textAlign: "center",
  },

  sectionContainer: {
    backgroundColor: "white",
    borderColor: "lightgrey",
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderRightWidth: 4,
    borderLeftWidth: 4,
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 15,
    marginBottom: 25,
  },

  subjectText: {
    fontSize: 20,
    fontWeight: "bold",
  },

  pickerContainer: {
    backgroundColor: "#F0F0F0",
    borderRadius: 200,
    marginTop: 10,
  },

  stockButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  stockButton: (stockSelected) => ({
    backgroundColor: stockSelected ? "#0096FF" : "#F0F0F0",
    width: 120,
    height: 45,
    marginTop: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  }),

  cryptoButton: (stockSelected) => ({
    backgroundColor: !stockSelected ? "#0096FF" : "#F0F0F0",
    width: 120,
    height: 45,
    marginTop: 10,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  }),

  stockButtonText: (stockSelected) => ({
    color: stockSelected ? "white" : "#5F5F5F",
    fontSize: 18,
    fontWeight: "500",
  }),

  cryptoButtonText: (stockSelected) => ({
    color: !stockSelected ? "white" : "#5F5F5F",
    fontSize: 18,
    fontWeight: "500",
  }),

  applyButtonContainer: {
    justifyContent: "center",
  },

  applyButton: {
    backgroundColor: "#0096FF",
    width: 320,
    height: 55,
    padding: 10,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },

  applyButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
});

export default styles;
