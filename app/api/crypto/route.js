// app/api/crypto/route.js
import fetch from "node-fetch";

const BASE_URL = "https://api.coincap.io/v2";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const coinId = searchParams.get("coinId") || "bitcoin";
  const coinUrl = `${BASE_URL}/assets/${coinId}`;
  const chartUrl = `${BASE_URL}/assets/${coinId}/history?interval=d1`;

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

    // Calculate percentage change
    const currentPrice = parseFloat(coinData.data.priceUsd);
    const initialPrice = parseFloat(chartData.data[0].priceUsd);
    const percentageChange =
      ((currentPrice - initialPrice) / initialPrice) * 100;

    // Transform chart data
    const transformedChartData = chartData.data.map((entry) => ({
      timestamp: new Date(entry.time).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      price: parseFloat(entry.priceUsd),
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
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
    });
  }
}
