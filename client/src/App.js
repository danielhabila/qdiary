import React, { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [addAuthor, setAddAuthor] = useState("");
  const [addQuote, setAddQuote] = useState("");

  const [listOfQuotes, setListOfQuotes] = useState([]);
  const [randomQuote, setRandomQuote] = useState([]);

  const [updateQuote, setUpdateQuote] = useState("");
  const [updateAuthor, setUpdateAuthor] = useState("");
  //this renders everytime we refresh our page or if item in square brackets change
  useEffect(() => {
    collectQuote();
    aRandomQuote();
  }, []);

  async function collectQuote() {
    await Axios.get("http://localhost:3001/readAllQuotes").then((response) => {
      setListOfQuotes(response.data);
    });
  }
  // Generating a random quote
  async function aRandomQuote() {
    await Axios.get("http://localhost:3001/getRandom").then((response) => {
      setRandomQuote(response.data);
    });
  }

  const addToList = (e) => {
    Axios.post("http://localhost:3001/add", {
      author: addAuthor,
      quote: addQuote,
    }).then((response) => {
      // alert("quoting created");

      //this allows us to update the list of quotes upon submission of form
      setListOfQuotes([
        ...listOfQuotes,
        {
          author: addAuthor,
          quote: addQuote,
        },
      ]);
    });

    // we are connecting our app.js frontend to our index.js backend by passing the route from our backend and passing the objects of author and quote from the backend and connecting it to the states from the front end.
  };

  // The .put method is used to update. The object we pass is the called the "body" object which we can tap into in the backend
  const updateDB = (id) => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      updateQuote: updateQuote,
      updateAuthor: updateAuthor,
    }).then(() => {
      setListOfQuotes(
        listOfQuotes.map((value) => {
          return value._id === id
            ? { _id: id, quote: updateQuote, author: updateAuthor }
            : value;
        })
      );
    });
  };

  return (
    <div>
      <div className="App">
        <h1>Qdiary</h1>

        <label htmlFor="aquote">The Quote: </label>
        <input
          type="text"
          onChange={(e) => {
            setAddQuote(e.target.value);
          }}
        />
        <label htmlFor="myauthor">The Author: </label>
        <input
          type="text"
          onChange={(e) => {
            setAddAuthor(e.target.value);
          }}
        />
        <button onClick={addToList}>Add To List</button>
      </div>

      {/* ********************** */}
      <div>
        <h2 style={{ textAlign: "center" }}>Random quote</h2>
        {randomQuote.map((one, key) => {
          return (
            <div key={key}>
              <h1>Quote: {one.quote} </h1>
              <h3>Author: {one.author} </h3>
              <button>Refresh</button>
            </div>
          );
        })}
      </div>

      {/* ********************** */}
      <div className="mylist">
        {listOfQuotes.map((qotd, key) => {
          return (
            <div key={key}>
              <h1>Quote: {qotd.quote} </h1>
              <h3>Author: {qotd.author} </h3>
              <input
                type="text"
                placeholder="Edit Quote..."
                onChange={(e) => {
                  setUpdateQuote(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Edit Author Name..."
                onChange={(e) => {
                  setUpdateAuthor(e.target.value);
                }}
              />
              <button onClick={() => updateDB(qotd._id)}>Update</button>
              <button>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
