import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

import styles from "./Parts.style";
import StockCard from "../cards/StockCard";
import useFetch from "../../../hook/useFetch";

const BrowseStocks = () => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch("market-trends", {
    trend_type: "MOST_ACTIVE",
    country: "us",
    language: "en",
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Browse stocks</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Browse cryptos</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" colors={"black"} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          data
            ?.slice(0, 20)
            .map((item) => (
              <StockCard
                item={item}
                key={`newest-stock-${item?.google_mid}`}
                handleNavigate={() =>
                  router.push(`/newest-stocks${item?.google_mid}`)
                }
              />
            ))
        )}
      </View>
    </View>
  );
};

export default BrowseStocks;
