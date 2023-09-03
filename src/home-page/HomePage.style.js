import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 50,
    paddingLeft: 20,
    paddingRight: 20,
    width: "100%",
    backgroundColor: "grey",
  },

  componentContainer: {
    //backgroundColor: 'black',
  },

  trendingStocks: {
    height: 250,
    backgroundColor: "white",
  },

  newestStocks: {
    height: 600,
    backgroundColor: "white",
  },

  title: {
    fontWeight: "bold",
    fontSize: 30,
    paddingTop: 20,
    paddingBottom: 20,
  },

  subtitle: {
    fontWeight: "bold",
    fontSize: 20,
    padding: 10,
  },

  appLogo: {
    width: 60,
    height: 60,
  },
});

export default styles;
