import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const Candle = ({ tickerSymbol, chartData }) => {
  const options = {
    chart: {
      type: "candlestick",
      height: 350,
    },
    title: {
      text: tickerSymbol,
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  if (chartData === null) {
    return <div className='noChart'>No Chart</div>;
  } else {
    let data = [];
    for (let key in chartData["Time Series (60min)"]) {
      let innerData = [];
      innerData.push(
        Math.floor(new Date(key).getTime()),
        chartData["Time Series (60min)"][key]["1. open"],
        chartData["Time Series (60min)"][key]["2. high"],
        chartData["Time Series (60min)"][key]["3. low"],
        chartData["Time Series (60min)"][key]["4. close"]
      );
      data.push(innerData);
    }
    const newData = [{ data }];
    return (
      <div>
        <Chart
          className='chart'
          series={newData}
          options={options}
          type='candlestick'
        />
      </div>
    );
  }
};

export default Candle;
