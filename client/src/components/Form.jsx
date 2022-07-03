import React, { useState, useEffect } from "react";
import axios from "axios";

const Form = ({
  search,
  tickerSymbol,
  setSearch,
  setTickerSymbol,
  watchList,
  setHomePage,
  addToList,
}) => {
  const [button, setButton] = useState("Add to Watchlist");

  return (
    <div>
      <form>
        <input
          className='searchBar'
          placeholder='Search...'
          onChange={(e) => {
            const newTicker = e.target.value;
            setTickerSymbol(newTicker.toUpperCase());
          }}
        ></input>
        <button
          className='searchButton'
          onClick={(e) => {
            e.preventDefault();
            setSearch(!search);
          }}
        >
          Go!
        </button>
        <button
          className='watchListButton'
          onClick={(e) => {
            addToList(tickerSymbol);
          }}
        >
          {button}
        </button>
      </form>
    </div>
  );
};

export default Form;
