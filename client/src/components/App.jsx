import React, { useState, useEffect } from "react";
import Candle from "./Candle.jsx";
import News from "./News.jsx";
import WatchList from "./WatchList.jsx";
import Form from "./Form.jsx";
import axios from "axios";
import "regenerator-runtime/runtime";
import config from "../../../config.js";

const App = () => {
  const [didMount, setDidMount] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState(false);
  const [tickerSymbol, setTickerSymbol] = useState("QQQ");
  const [chartData, setChartData] = useState(null);
  const [newsData, setNewsData] = useState(null);
  const [watchList, setWatchList] = useState(null);

  const fetchData = (tickerSymbol = "QQQ") => {
    const getWatchList = axios.get("/watchList").then((res) => {
      setWatchList(res.data);
    });
    const getChartData = axios
      .get("/candle", { params: { ticker: tickerSymbol } })
      .then((res) => {
        setChartData(res.data);
      });
    const getNewsData = axios
      .get("/news", { params: { ticker: tickerSymbol } })
      .then((res) => {
        setNewsData(res.data);
      });

    const promises = [getWatchList, getChartData, getNewsData];

    Promise.all(promises)
      .then(() => {
        setIsError(false);
      })
      .then(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 2500);
      })
      .then(() => {
        setTickerSymbol(tickerSymbol);
      })
      .catch((err) => {
        setIsError(true);
        console.log(err);
      });
  };

  const removeFromList = (etf) => {
    let params = {
      symbol: etf,
    };
    axios
      .put("/watchList", params)
      .then(() => this.fetchData())
      .catch((err) => {
        console.log(err);
      });
  };

  const addToList = (etf) => {
    let params = {
      symbol: etf,
    };
    axios.post("/watchList", params).catch((err) => {
      console.log(err);
    });
  };

  useEffect(() => {
    const url = new URL(document.URL);
    const symbol = parseInt(url.search.split("=")[1], 10);
    if (symbol) {
      fetchData(symbol);
    } else {
      fetchData(tickerSymbol);
    }
  }, [search]);

  if (isError) {
    return (
      <div className='loadingDiv'>
        <span className='loading'>Requests failed to load :(</span>{" "}
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className='loadingDiv'>
        <span className='loading'>Loading...</span>
      </div>
    );
  }

  return (
    <div className='main'>
      <div className='topBar'>
        <h1 className='title'>To the Moon</h1>
        <Form
          search={search}
          tickerSymbol={tickerSymbol}
          watchList={watchList}
          setSearch={setSearch}
          setTickerSymbol={setTickerSymbol}
          addToList={addToList}
        />
      </div>
      <div className='container'>
        <div className='leftContainer'>
          <News newsData={newsData} />
        </div>
        <div className='middleContainer'>
          {" "}
          <Candle tickerSymbol={tickerSymbol} chartData={chartData} />
        </div>
        <div className='rightContainer'>
          <WatchList
            watchList={watchList}
            search={search}
            setTickerSymbol={setTickerSymbol}
            setSearch={setSearch}
            removeFromList={removeFromList}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
