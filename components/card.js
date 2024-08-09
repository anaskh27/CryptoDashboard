"use client";
import { useEffect, useState } from "react";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export function CoinCard(props) {
  const InitialchartData = [
    { timestamp: "January", price: 186 },
    { timestamp: "February", price: 305 },
    { timestamp: "March", price: 237 },
    { timestamp: "April", price: 73 },
    { timestamp: "May", price: 209 },
    { timestamp: "June", price: 214 },
  ];

  const {
    image = "/logo1.png",
    name = "Unknown",
    symbol = "N/A",
    price = "$100",
    percentage = "25%",
    percentageClass = "",
    chartData = InitialchartData,
  } = props || {};

  const chartConfig = {
    desktop: {
      label: "Rate",
      color: "#64CFF9",
    },
  };

  return (
    <div className=" w-[258px] h-[178px] bg-[#1B2028] rounded-[12px] text-white overflow-hidden">
      <div className="flex items-center gap-2">
        <div className="m-2 rounded-3xl w-[44px] h-[44px] bg-[#31353F] flex items-center justify-center">
          <img
            src={image}
            alt="Logo"
            className="w-[24px] h-[24px] object-contain rounded-3xl"
          />
        </div>
        <p>{name}</p>
        <p>{symbol}</p>
      </div>
      <div className="flex justify-between  p-4 ">
        <div className="flex flex-col items-start gap-8">
          <p className="text-lg font-semibold">${Math.floor(price)}</p>
          <p className={`text-sm ${percentageClass}`}>
            {Number(percentage).toFixed(2)}%
          </p>
        </div>
        <div className="flex-1 ml-3 ">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <Line
                type="desktop"
                dataKey="price"
                stroke="#1ECB4F"
                strokeWidth={1}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
export default CoinCard();
