"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

const getIconPath = (coinName) => {
  const iconName = coinName?.toLowerCase() || "";
  return `/${iconName}.png`;
};

export function DayGraph({ coinChartData = [] }) {
  const [selectedCoinIndex, setSelectedCoinIndex] = useState(0);

  const chartConfig = {
    price: {
      label: "Price = ",
      color: "#3A6FF8",
    },
  };

  const handleValueChange = (value) => {
    setSelectedCoinIndex(Number(value));
  };

  const selectedCoin = coinChartData[selectedCoinIndex];

  if (!selectedCoin || !selectedCoin.chartData) {
    return <div className="text-white p-4">No chart data available</div>;
  }

  return (
    <div className="w-full h-[441px] bg-[#1B2028] text-white rounded-2xl overflow-hidden">
      <Card className="border-none">
        <CardHeader className="sm:flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={getIconPath(selectedCoin?.name)}
              alt={`${selectedCoin?.name} icon`}
              className="w-10 h-10 mr-2"
            />
            <CardTitle>
              {selectedCoin?.name} {selectedCoin?.symbol} $
              {Math.floor(selectedCoin?.price)}
            </CardTitle>
            <CardDescription
              className={`text-lg mt-2 mr-4 ${
                selectedCoin?.percentage >= 0
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {Number(selectedCoin?.percentage).toFixed(2)}%
            </CardDescription>
          </div>

          <div>
            <Select onValueChange={handleValueChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Coin" />
              </SelectTrigger>
              <SelectContent className="bg-[#1B2028] text-white">
                {coinChartData.map((coin, index) => (
                  <SelectItem key={index} value={index.toString()}>
                    {coin.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart
              data={selectedCoin?.chartData || []}
              margin={{ left: -5, right: 12 }}
            >
              <XAxis
                dataKey="timestamp"
                tickFormatter={(value) => value} // assume it's already formatted
                style={{ fill: "#ffffff" }}
              />
              <YAxis
                dataKey="price"
                tickLine={true}
                axisLine={false}
                tickMargin={1}
                style={{ fill: "#ffffff" }}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Area
                dataKey="price"
                type="monotone"
                fill="#5AD880"
                fillOpacity={0.5}
                stroke="#1ECB4F"
                strokeWidth={2}
                dot={false}
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

export default DayGraph;
