"use client";
import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fetchCoinData } from "../utils/api";
import "../Reports/styles.css";

const ReportPage = () => {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const coins = ["bitcoin", "ethereum", "litecoin", "solana"];
      const data = await Promise.all(coins.map(fetchCoinData));
      setRowData(data.filter(Boolean));
    }
    fetchData();
  }, []);

  const columns = [
    {
      headerName: "Icons",
      field: "icon",
      width: 100,
      cellRenderer: (params) => (
        <div
          className="flex items-center"
          style={{ width: "100%", height: "100%" }}
        >
          <img
            src={`/${params.data.name.toLowerCase()}.png`}
            alt={params.data.name}
            style={{ width: "30px", height: "30px" }}
          />
        </div>
      ),
    },
    { headerName: "Coin", field: "name", width: 150 },
    { headerName: "Symbol", field: "symbol", width: 100 },
    {
      headerName: "Price",
      field: "price",
      width: 130,
      valueFormatter: (params) => `$ ${Math.floor(params.value)}`,
    },
    {
      headerName: "Change (12h)",
      field: "percentage",
      width: 150,
      valueFormatter: (params) => `${Math.floor(params.value)}%`,
    },
    {
      headerName: "Graph",
      field: "chartData",
      width: 350,
      cellRenderer: (params) => {
        console.log("params", params);
        return (
          <ResponsiveContainer width="100%" height={"100%"}>
            <LineChart data={params.value.chartData}>
              <Line
                type="monotone"
                dataKey="price"
                stroke="#1ECB4F"
                strokeWidth={1}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      },
    },
  ];

  return (
    <div
      className="ag-theme-alpine-dark "
      style={{ height: 260, width: "100%" }}
    >
      <AgGridReact rowData={rowData} columnDefs={columns} icons={true} />
    </div>
  );
};

export default ReportPage;
