export async function fetchCoinData(coin) {
  try {
    const response = await fetch(`https://api.coincap.io/v2/assets/${coin}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data for ${coin}`);
    }
    const data = await response.json();
    return {
      price: parseFloat(data.data.priceUsd),
      percentage: parseFloat(data.data.changePercent24Hr),
      chartData: await fetchChartData(coin),
      symbol: data.data.symbol,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchChartData(coin) {
  try {
    const response = await fetch(
      `https://api.coincap.io/v2/assets/${coin}/history?interval=d1`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch chart data for ${coin}`);
    }
    const data = await response.json();
    return {
      price: parseFloat(data.data[data.data.length - 1].priceUsd),
      percentage: parseFloat(data.data[data.data.length - 1].changePercent24Hr),
      chartData: data.data.map((entry) => ({
        timestamp: entry.time,
        price: parseFloat(entry.priceUsd),
      })),
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
