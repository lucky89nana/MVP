import React, { useState, useEffect } from "react";

const NewsPost = ({ data }) => {
  return (
    <div className='newsPost'>
      <a href={`${data.url}`} target='_blank'>
        {data.title}
      </a>
      <br></br>
      <p>
        {data.content}
        <br></br>
        {data.publishedAt.substring(0, 10)}
      </p>
      <br></br>
      <img className='newsPhoto' src={`${data.urlToImage}`} />
      <br></br>
      <br></br>
    </div>
  );
};

export default NewsPost;
