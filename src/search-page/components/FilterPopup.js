import {
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
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
      priceOption: "0",
      stockSelected: this.props.stockSelected,
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
    this.setState({ stockSelected: isSelected });
  };

  componentDidUpdate(prevProps) {
    if (this.props.stockSelected !== prevProps.stockSelected) {
      this.setState({ stockSelected: this.props.stockSelected });
    }
  }

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
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
    );
  };

  renderContent = () => {
    const { currency, priceOption, stockSelected } = this.state;
    return (
      <ScrollView>
        <View style={styles.contentContainer}>
          <View style={styles.sectionContainer}>
            <Text style={styles.subjectText}>Type</Text>
            <View style={styles.stockButtonsContainer}>
              <TouchableOpacity
                style={styles.stockButton(stockSelected)}
                onPress={() => {
                  this.setStockSelected(true);
                }}
              >
                <Text style={styles.stockButtonText(stockSelected)}>Stock</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.stockButton(!stockSelected)}
                onPress={() => {
                  this.setStockSelected(false);
                }}
              >
                <Text style={styles.stockButtonText(!stockSelected)}>Crypto</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.subjectText}>Currency</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={currency}
                onValueChange={(itemValue) => this.setCurrency(itemValue)}
              >
                <Picker.Item label="Any" value="" />
                <Picker.Item label="AUD" value="AUD" />
                <Picker.Item label="CAD" value="CAD" />
                <Picker.Item label="EUR" value="EUR" />
                {/* <Picker.Item label="GBP" value="GBP" /> */}
                {/* <Picker.Item label="GBX" value="GBX" /> */}
                <Picker.Item label="INR" value="INR" />
                {/* <Picker.Item label="MXN" value="MXN" /> */}
                {/* <Picker.Item label="THB" value="THB" /> */}
                <Picker.Item label="USD" value="USD" />
              </Picker>
            </View>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.subjectText}>Price Range</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={priceOption}
                onValueChange={(itemValue) => this.setPriceOption(itemValue)}
              >
                <Picker.Item label="Any" value="0" />
                <Picker.Item label="$0 ~ $50" value="1" />
                <Picker.Item label="$50 ~ $100" value="2" />
                <Picker.Item label="$100 ~ $200" value="3" />
                <Picker.Item label="$200 ~ $400" value="4" />
                <Picker.Item label="$400 ~ $800" value="5" />
                <Picker.Item label="$800+" value="6" />
              </Picker>
            </View>
          </View>

          <View style={styles.applyButtonContainer}>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={this.handleApplyFilters}
            >
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  };

  render() {
    let { show } = this.state;
    const { onTouchOutside, title } = this.props;

    return (
      <Modal
        animationType={"slide"}
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
              backgroundColor: "#F0F0F0",
              width: "100%",
              height: "75%",
              borderTopRightRadius: 80,
              borderTopLeftRadius: 80,
              paddingHorizontal: 20,
              borderColor: "grey",
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
