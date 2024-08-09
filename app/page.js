"use client";

import { CoinCard } from "@/components/card";
import { CreditCard } from "@/components/creditCard";
import { Portfolio } from "@/components/portfolio";
import { useState, useEffect } from "react";
import { fetchCoinData } from "./utils/api";
import { DayGraph } from "@/components/dayGraph";
import Loader from "@/components/customLoader/loader";

export default function Home() {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const coins = ["bitcoin", "ethereum", "litecoin", "solana"];
      const data = await Promise.all(
        coins.map(async (coin) => {
          const response = await fetchCoinData(coin);
          if (response) {
            return {
              name: coin.charAt(0).toUpperCase() + coin.slice(1),
              symbol: coin.toUpperCase(),
              ...response,
            };
          }
          return null;
        })
      );

      setCryptoData(data.filter((coin) => coin !== null));
      setLoading(false);
    }

    fetchData();
    const intervalId = setInterval(fetchData, 10000);

    return () => clearInterval(intervalId);
  }, []);

  console.log("cryptoData", cryptoData);

  return (
    <main>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen ">
          <Loader />
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center gap-2 sm:flex md:flex-row">
            {cryptoData.map((coin, index) => (
              <CoinCard
                key={index}
                image={`/${coin.name.toLowerCase()}.png`}
                name={coin.name}
                symbol={coin.symbol}
                price={coin.price}
                percentage={coin.percentage}
                percentageClass={
                  coin.percentage >= 0 ? "text-green-500" : "text-red-500"
                }
                chartData={coin.chartData?.chartData}
              />
            ))}
          </div>
          <div className="mt-8 flex  flex-col lg:flex-row  gap-4 w-full ">
            <div className="flex flex-col gap-4">
              <CreditCard
                cardNumber="3232 4763 7246 7430"
                cardOwner="Muhammad Anas Khan"
              />
              <Portfolio />
            </div>
            <DayGraph coinChartData={cryptoData} />
          </div>
        </>
      )}
    </main>
  );
}
