import React from "react";

function Home(props) {
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Random quote</h2>
      {props.randomQuote.map((one, key) => {
        return (
          <div key={key}>
            <h1>Quote: {one.quote} </h1>
            <h3>Author: {one.author} </h3>
            <button onClick={props.aRandomQuote}>Refresh</button>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
