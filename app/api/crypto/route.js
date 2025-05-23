import fetch from "node-fetch";

const BASE_URL = "https://api.coingecko.com/api/v3";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const coinId = searchParams.get("coinId") || "bitcoin";

  const coinUrl = `${BASE_URL}/coins/${coinId}`;
  const chartUrl = `${BASE_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=30`;

  try {
    // Fetch coin data
    const coinResponse = await fetch(coinUrl);
    if (!coinResponse.ok) {
      throw new Error(`Failed to fetch data for ${coinId}`);
    }
    const coinData = await coinResponse.json();

    // Fetch chart data
    const chartResponse = await fetch(chartUrl);
    if (!chartResponse.ok) {
      throw new Error(`Failed to fetch chart data for ${coinId}`);
    }
    const chartData = await chartResponse.json();

    const prices = chartData.prices;
    const currentPrice = prices[prices.length - 1][1];
    const initialPrice = prices[0][1];
    const percentageChange =
      ((currentPrice - initialPrice) / initialPrice) * 100;

    // Transform chart data
    const transformedChartData = prices.map(([timestamp, price]) => ({
      timestamp: new Date(timestamp).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      price: parseFloat(price),
    }));

    return new Response(
      JSON.stringify({
        currentPrice: `$${currentPrice.toFixed(2)}`,
        percentageChange: `${percentageChange.toFixed(2)}%`,
        chartData: transformedChartData,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}
