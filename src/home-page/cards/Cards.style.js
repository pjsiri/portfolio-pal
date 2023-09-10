import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../../constants/theme";

const styles = StyleSheet.create({
  container: (selectedJob, item) => ({
    width: 280,
    padding: SIZES.xLarge,
    marginBottom: SIZES.small,
    backgroundColor: selectedJob === item.google_mid ? COLORS.primary : "#FFF",
    borderRadius: SIZES.xLarge,
    justifyContent: "space-between",
    ...SHADOWS.medium,
    //shadowColor: "black",
  }),
  logoContainer: (selectedJob, item) => ({
    width: 50,
    height: 50,
    backgroundColor: selectedJob === item.google_mid ? "#FFF" : COLORS.white,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  }),
  logoImage: {
    width: "100%",
    height: "100%",
  },
  companyName: {
    fontSize: SIZES.large,
    fontWeight: "bold",
    //fontFamily: FONT.regular,
    color: "#000",
    marginTop: SIZES.small / 1.5,
  },
  companySymbol: {
    fontSize: SIZES.small + 2,
    fontWeight: "500",
    //fontFamily: FONT.regular,
    color: "#000",
    marginTop: SIZES.small / 1.5,
  },
  companyPrice: {
    fontSize: SIZES.medium,
    fontWeight: "bold",
    //fontFamily: FONT.regular,
    color: "#000",
    textAlign: "right",
  },
  infoContainer: {
    marginTop: SIZES.large,
  },
  jobName: (selectedJob, item) => ({
    fontSize: SIZES.large,
    //fontFamily: FONT.medium,
    color: selectedJob === item.google_mid ? COLORS.white : COLORS.primary,
  }),
  infoWrapper: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  publisher: (selectedJob, item) => ({
    fontSize: SIZES.medium - 2,
    //fontFamily: FONT.bold,
    color: selectedJob === item.google_mid ? COLORS.white : COLORS.primary,
  }),
  location: {
    fontSize: SIZES.medium - 2,
    //fontFamily: FONT.regular,
    color: "#B3AEC6",
  },
});

export default styles;
