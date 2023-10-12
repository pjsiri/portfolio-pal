import {
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";

import styles from "./Filter.style";

const deviceHeight = Dimensions.get("window").height;

export class FilterPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      currency: "",
      priceOption: "",
      stockSelected: props.stockSelected,
    };
  }

  show = () => {
    this.setState({ show: true });
  };

  close = () => {
    this.setState({ show: false });
  };

  setCurrency = (currency) => {
    this.setState({ currency: currency });
  };

  setPriceOption = (option) => {
    this.setState({ priceOption: option });
  };

  setStockSelected = (isSelected) => {
    this.setState({ currency: isSelected });
  };

  handleApplyFilters = async () => {
    const { currency, priceOption, stockSelected } = this.state;

    this.props.applyFilters(currency, priceOption, stockSelected);

    this.close(); // Close the popup
  };

  renderOutsideTouchable(onTouch) {
    const view = <View style={{ flex: 1, width: "100%" }} />;
    if (!onTouch) return view;

    return (
      <TouchableWithoutFeedback
        onPress={onTouch}
        style={{ flex: 1, width: "100%" }}
      >
        {view}
      </TouchableWithoutFeedback>
    );
  }

  renderTitle = () => {
    const { title } = this.props;
    return (
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            color: "#182E44",
            fontSize: 25,
            fontWeight: "500",
            marginTop: 15,
            marginBottom: 20,
            fontWeight: 900,
          }}
        >
          {title}
        </Text>
      </View>
    );
  };

  renderContent = () => {
    const { currency, priceOption, stockSelected } = this.state;
    return (
      <View>
        <Text>Currency</Text>

        <Picker
          selectedValue={currency}
          onValueChange={(itemValue) => this.setCurrency(itemValue)}
        >
          <Picker.Item label="Any" value="" />
          <Picker.Item label="USD" value="USD" />
          <Picker.Item label="NZD" value="NZD" />
        </Picker>

        <Text>Price Range</Text>

        <Picker
          selectedValue={priceOption}
          onValueChange={(itemValue) => this.setPriceOption(itemValue)}
        >
          <Picker.Item label="Any" value="" />
          <Picker.Item label="$0 ~ $50" value="1" />
          <Picker.Item label="$50 ~ $100" value="2" />
          <Picker.Item label="$100 ~ $200" value="3" />
          <Picker.Item label="$200 ~ $400" value="4" />
          <Picker.Item label="$400 ~ $800" value="5" />
          <Picker.Item label="$800+" value="6" />
        </Picker>

        <Text>Stock/Crypto</Text>

        <View>
          <TouchableOpacity
            onPress={() => {
              this.setStockSelected(true);
            }}
          >
            <Text>Stock</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setStockSelected(false);
            }}
          >
            <Text>Currency</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={this.handleApplyFilters}>
          <Text>Apply Filters</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    let { show } = this.state;
    const { onTouchOutside, title } = this.props;

    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={show}
        onRequestClose={this.close}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#000000AA",
            justifyContent: "flex-end",
          }}
        >
          {this.renderOutsideTouchable(onTouchOutside)}
          <View
            style={{
              backgroundColor: "white",
              width: "100%",
              height: "75%",
              borderTopRightRadius: 80,
              borderTopLeftRadius: 80,
              paddingHorizontal: 20,
              //maxHeight: deviceHeight * 0.4,
            }}
          >
            {this.renderTitle()}
            {this.renderContent()}
          </View>
        </View>
      </Modal>
    );
  }
}
