import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../../constants/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: SIZES.medium,
    borderRadius: SIZES.large,
    backgroundColor: "#FFF",
    ...SHADOWS.medium,
    shadowColor: "black",
  },
  logoContainer: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  heartContainer: {
    top: -5,
    right: -5,
    padding: 5,
    flex: 1,
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: "#F0F0F0",
    alignSelf: "flex-end",
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
  heartImage: {
    width: "100%",
    height: "100%",
  },
  nameContainer: {
    flex: 3,
    marginHorizontal: SIZES.medium,
  },
  priceContainer: {
    flex: 5,
  },
  priceOuterContainer: {
    flex: 3,
    justifyContent: "space-between",
  },
  stockName: {
    fontSize: SIZES.medium,
    fontWeight: "bold",
    color: "black",
  },
  stockSymbol: {
    fontSize: SIZES.small + 2,
    color: "black",
    marginTop: 3,
  },
  stockPrice: {
    fontSize: SIZES.medium - 1,
    fontWeight: "bold",
    color: "black",
  },
});

export default styles;
