import React, { useState, useEffect } from "react";
import WatchPost from "./WatchPost.jsx";

const WatchList = ({
  watchList,
  setTickerSymbol,
  search,
  setSearch,
  removeFromList,
}) => {
  return (
    <div className='watchList'>
      My Watchlist:
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {watchList.map((watch, idx) => {
            return (
              <WatchPost
                key={idx}
                watch={watch}
                setTickerSymbol={setTickerSymbol}
                search={search}
                setSearch={setSearch}
                removeFromList={removeFromList}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default WatchList;
