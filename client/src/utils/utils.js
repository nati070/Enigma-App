const axios = require("axios");
const serverAddress = "http://localhost:8000/api";

exports.setCsvFile = async (file) => {
  try {
    await axios.post(serverAddress + "/set-csv", file);
  } catch (err) {
    console.error("falied csv file", err);
  }
};

// dataCoins = [btc , eth]
const calETHtoBTC = (dataCoins) => {
  return {
    name: "ETC-BTC",
    bid: (dataCoins[1].bid / dataCoins[0].ask).toFixed(6),
    ask: (dataCoins[1].ask / dataCoins[0].bid).toFixed(6),
    last: (dataCoins[1].last / dataCoins[0].last).toFixed(6),
  };
};
exports.getInstrumentsData = async () => {
  try {
    const dataCoins = await axios.get(serverAddress + "/coins-data");
    dataCoins.data.push(calETHtoBTC(dataCoins.data));
    return dataCoins.data;
  } catch (err) {
    console.error("falied getInstrumentsData", err);
  }
};

exports.getAnalyticsInfo = async (filter) => {
  try {
    const dataAnalytics = await axios.post(
      serverAddress + "/analytics-data",
      filter
    );
    return dataAnalytics.data;
  } catch (err) {
    console.error("falied getAnalyticsInfo", err);
  }
};
