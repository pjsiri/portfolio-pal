import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import useFetch from "../../../hook/useFetch";
import { LineChart } from "react-native-chart-kit";

const StockChart = ({ endpoint, query }) => {
  const [refresh, setRefresh] = useState(true);
  const { data, isLoading, error, refetch } = useFetch(endpoint, query);

  let dateKeys = data?.time_series ? Object.keys(data.time_series) : [];
  let priceData = dateKeys.map(
    (date) =>
      (data?.time_series[date]?.price ||
        data?.time_series[date]?.exchange_rate) ??
      0
  );

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <View style={{ justifyContent: "center", height: 220, marginTop: 15 }}>
      {isLoading || priceData.length === 0 ? (
        <ActivityIndicator size="large" />
      ) : error ? (
        <Text style={textStyles}>Something went wrong</Text>
      ) : (
        <LineChart
          data={{
            // labels: dateKeys,
            datasets: [
              {
                data: priceData,
              },
            ],
          }}
          width={350}
          height={250}
          yAxisLabel="$"
          chartConfig={{
            backgroundGradientFrom: "#F0F0F0",
            backgroundGradientTo: "#F0F0F0",
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 16 },
          }}
          withDots={false}
          withVerticalLines={false}
        />
      )}
    </View>
  );
};

export default StockChart;
