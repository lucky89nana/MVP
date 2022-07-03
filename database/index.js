const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mvp", (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("connected to mongo");
});

const watchListSchema = new mongoose.Schema({
  symbol: String,
});

module.exports = {
  watchList: mongoose.model("watchList", watchListSchema),
};
