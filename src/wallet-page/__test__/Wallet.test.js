import React from "react";
import renderer from "react-test-renderer";
import { TransactionItem } from "../Wallet";

describe("TransactionItem", () => {
  //   test("should render a transaction item with amount correctly", () => {
  //     const item = {
  //       type: "Buy",
  //       amount: 100.0,
  //     };

  //     const tree = renderer.create(<TransactionItem item={item} />).toJSON();
  //     expect(tree).toMatchSnapshot();
  //   });

  //   test("should render a transaction item without amount correctly", () => {
  //     const item = {
  //       type: "Buy",
  //       symbol: "AAPL",
  //       quantity: 10,
  //       price: 150.0,
  //       totalPrice: 1500.0,
  //       timestamp: { toDate: () => new Date(2023, 1, 15) },
  //     };

  //     const tree = renderer.create(<TransactionItem item={item} />).toJSON();
  //     expect(tree).toMatchSnapshot();
  //   });

  test("should render a transaction item without amount correctly", () => {
    const item = {
      type: "Buy",
      symbol: "AAPL",
      quantity: 10,
      price: 150.0,
      totalPrice: 1500.0,
      timestamp: { toDate: () => new Date(2023, 1, 15) },
    };

    const tree = renderer.create(<TransactionItem item={item} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
