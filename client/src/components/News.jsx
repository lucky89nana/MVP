import React, { useState, useEffect } from "react";
import NewsPost from "./NewsPost.jsx";

const News = ({ newsData }) => {
  if (newsData === null) {
    return <div className='newsList'>Nothing to see yet D:</div>;
  } else {
    console.log("news:", newsData);
    return (
      <div className='newsList'>
        {newsData.articles.map((data, idx) => {
          return <NewsPost key={idx} data={data} />;
        })}
      </div>
    );
  }
};

export default News;
