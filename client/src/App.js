import React, { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [addAuthor, setAddAuthor] = useState("");
  const [addQuote, setAddQuote] = useState("");

  const [getQuote, setGetQuote] = useState([]);
  const [randomQuote, setRandomQuote] = useState([]);

  useEffect(() => {
    collectQuote();
    aRandomQuote();
  }, []);

  async function collectQuote() {
    await Axios.get("http://localhost:3001/getQuotes").then((response) => {
      setGetQuote(response.data);
    });
  }
  // Generating a random quote
  async function aRandomQuote() {
    await Axios.get("http://localhost:3001/getRandom").then((response) => {
      setRandomQuote(response.data);
      console.log(response.data);
    });
  }

  function pushAuthorName(e) {
    const typedAuthor = e.target.value;
    setAddAuthor(typedAuthor);
  }

  function pushQuote(e) {
    const typedQuote = e.target.value;
    setAddQuote(typedQuote);
  }

  const addToList = (e) => {
    Axios.post("http://localhost:3001/insert", {
      author: addAuthor,
      quote: addQuote,
    }).then((response) => {
      alert("quoting created");
    });

    // we are connecting our app.js frontend to our index.js backend by passing the route from our backend and passing the objects of author and quote from the backend and connecting it to the states from the front end.
    console.log(addAuthor + addQuote);
    // e.preventDefault();
  };

  return (
    <div>
      <div>
        {randomQuote.map((one) => {
          return (
            <div>
              <h1>Quote: {one.quote} </h1>
              <h3>Author: {one.author} </h3>
            </div>
          );
        })}
      </div>

      <div>
        {getQuote.map((qotd) => {
          return (
            <div>
              <h1>Quote: {qotd.quote} </h1>
              <h3>Author: {qotd.author} </h3>
            </div>
          );
        })}
      </div>

      <div className="App">
        <h1>Qdiary</h1>
        <label htmlFor="myauthor">The Author: </label>
        <input type="text" id="myauthor" onChange={pushAuthorName} />
        <label htmlFor="aquote">The Quote: </label>
        <input type="text" id="aquote" onChange={pushQuote} />
        <button onClick={addToList}>Add To List</button>
      </div>
    </div>
  );
}

export default App;
