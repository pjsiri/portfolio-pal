import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    // Add stuff here 
    console.log("Search query:", searchQuery);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 20, width: 200, paddingHorizontal: 10 }}
        placeholder="Search Stocks"
        onChangeText={(text) => setSearchQuery(text)}
        value={searchQuery}
      />
      <Button title="Search" onPress={handleSearch} />
    </View>
  );
};

export default SearchPage;