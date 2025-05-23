export async function fetchCoinData(coinId) {
  try {
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data for ${coinId}`);
    }
    const data = await response.json();
    return {
      id: coinId,
      name: data.name,
      symbol: data.symbol.toUpperCase(),
      price: Math.floor(data.market_data.current_price.usd),
      percentage: Math.floor(data.market_data.price_change_percentage_24h),
      chartData: await fetchChartData(coinId),
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchChartData(coinId) {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=30`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch chart data for ${coinId}`);
    }
    const data = await response.json();

    return {
      price: parseFloat(data.prices[data.prices.length - 1][1]),
      percentage: null, // CoinGecko doesn't return this in chart data endpoint
      chartData: data.prices.map(([timestamp, price]) => ({
        timestamp,
        price,
      })),
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
