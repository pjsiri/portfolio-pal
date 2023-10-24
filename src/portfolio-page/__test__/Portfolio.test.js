import { testGetPortfolioData } from "../PortFolio";

describe("Portfolio", () => {
  //   test("should return correct data for 'All' graph type", () => {
  //     // Define a test case with mock data or dependencies if needed
  //     const graphType = "All";
  //     const userStocks = [
  //       { name: "Stock A", price: 100, color: "blue", totalStocks: 300 },
  //     ];
  //     const userCryptos = [
  //       { name: "Crypto X", price: 200, color: "green", totalCryptos: 400 },
  //     ];

  //     // Call the getPortfolioData function with the test case data
  //     const portfolioData = testGetPortfolioData(
  //       graphType,
  //       userStocks,
  //       userCryptos
  //     );

  //     // Define your expected data for the "All" graph type
  //     const expectedData = [
  //       { name: "Stock A", price: 100, color: "blue", totalStocks: 300 },
  //       { name: "Crypto X", price: 200, color: "green", totalCryptos: 400 },
  //     ];

  //     expect(portfolioData).toEqual(expectedData);
  //   });

  //   test("should return correct data for 'Stock' graph type", () => {
  //     // Define a test case with mock data or dependencies if needed
  //     const graphType = "Stock";
  //     const userStocks = [
  //       { name: "Stock A", price: 100, color: "blue", totalStocks: 300 },
  //     ];
  //     const userCryptos = [
  //       { name: "Crypto X", price: 200, color: "green", totalCryptos: 400 },
  //     ];

  //     // Call the getPortfolioData function with the test case data
  //     const portfolioData = testGetPortfolioData(
  //       graphType,
  //       userStocks,
  //       userCryptos
  //     );

  //     // Define your expected data for the "All" graph type
  //     const expectedData = [
  //       { name: "Stock A", price: 100, color: "blue", totalStocks: 300 },
  //     ];

  //     expect(portfolioData).toEqual(expectedData);
  //   });

  //   test("should return correct data for 'Crypto' graph type", () => {
  //     // Define a test case with mock data or dependencies if needed
  //     const graphType = "Crypto";
  //     const userStocks = [
  //       { name: "Stock A", price: 100, color: "blue", totalStocks: 300 },
  //     ];
  //     const userCryptos = [
  //       { name: "Crypto X", price: 200, color: "green", totalCryptos: 400 },
  //     ];

  //     // Call the getPortfolioData function with the test case data
  //     const portfolioData = testGetPortfolioData(
  //       graphType,
  //       userStocks,
  //       userCryptos
  //     );

  //     // Define your expected data for the "All" graph type
  //     const expectedData = [
  //       { name: "Crypto X", price: 200, color: "green", totalCryptos: 400 },
  //     ];

  //     expect(portfolioData).toEqual(expectedData);
  //   });

  test("should return correct data for 'S:C' graph type", () => {
    // Define a test case with mock data or dependencies if needed
    const graphType = "S:C";
    const userStocks = [
      { name: "Stock A", price: 100, color: "blue", totalStocks: 300 },
    ];
    const userCryptos = [
      { name: "Crypto X", price: 200, color: "green", totalCryptos: 400 },
    ];

    // Call the getPortfolioData function with the test case data
    const portfolioData = testGetPortfolioData(
      graphType,
      userStocks,
      userCryptos
    );

    // Define your expected data for the "All" graph type
    const expectedData = [
      { name: "Stocks", price: 300, color: "red" },
      { name: "Cryptos", price: 400, color: "blue" },
    ];

    expect(portfolioData).toEqual(expectedData);
  });
});
