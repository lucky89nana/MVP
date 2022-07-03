import React, { useState, useEffect } from "react";

const WatchPost = ({
  watch,
  setTickerSymbol,
  search,
  setSearch,
  removeFromList,
}) => {
  return (
    <tr>
      <th
        onClick={(e) => {
          setTickerSymbol(watch.symbol);
          setSearch(!search);
        }}
      >
        {watch.symbol}
      </th>
      <td
        onClick={(e) => {
          removeFromList(watch.symbol);
        }}
      >
        remove
      </td>
    </tr>
  );
};

export default WatchPost;
