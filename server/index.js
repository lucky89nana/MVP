const config = require("../config.js");
const { StringStream } = require("scramjet");
const alpha = require("alphavantage")({ key: config.alphavantage });
const axios = require("axios");
const moment = require("moment");
const express = require("express");
const request = require("request");
const db = require("../database/index.js");
const app = express();
const path = require("path");
const port = 3000;

const staticFilePath = path.join(__dirname, "..", "/client/dist");

app.use(express.static(staticFilePath));
app.use(express.json());

app.get("/watchList", (req, res) => {
  db.watchList.find({}).exec((err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(results);
    }
  });
});

app.post("/watchList", (req, res) => {
  const etf = req.body.symbol;
  let newWatch = {
    symbol: etf,
  };
  let newETF = new db.watchList(newWatch);
  newETF.save();
  res.send(`${etf} successfully added to the watch list!`);
  console.log(`${etf} successfully added to the watch list!`);
});

app.put("/watchList", (req, res) => {
  const etf = req.body.symbol;
  db.watchList.deleteOne({ symbol: etf }).exec((err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log(`${etf} successfully removed from watch list!`);
    }
  });
});

app.get("/candle", (req, res) => {
  const text = req.query.ticker;
  db.watchList.find({ symbol: text }).exec((err, result) => {
    if (err) {
      console.log("Chart unavailable");
    } else {
      alpha.data.intraday(`${text}`, "full", "json", "60min").then((data) => {
        res.send(data);
      });
    }
  });
});

app.get("/news", (req, res) => {
  let params = {
    q: req.query.ticker,
    from: "2022-06-01",
    sortBy: "relevancy",
    apiKey: config.newsapi,
    language: "en",
  };
  axios
    .get(
      `https://newsapi.org/v2/everything?q=${params.q}&from=${params.from}&sortBy=${params.sortBy}&language=${params.language}&apiKey=${params.apiKey}`
    )
    .then((data) => {
      res.status(200).send(data.data);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send(err);
    });
});

app.listen(port, () => {
  console.log(`app is listening at http://localhost:${port}`);
});
