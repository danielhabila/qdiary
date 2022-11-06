import React from "react";

function Edit(props) {
  return (
    <div className="App">
      <h1>Qdiary</h1>

      <label htmlFor="aquote">The Quote: </label>
      <input
        type="text"
        ref={props.inputRef}
        onChange={(e) => {
          props.setAddQuote(e.target.value);
        }}
      />
      <label htmlFor="myauthor">The Author: </label>
      <input
        type="text"
        ref={props.inputRef2}
        onChange={(e) => {
          props.setAddAuthor(e.target.value);
        }}
      />
      <button onClick={props.handleSubmit}>Add To List</button>
    </div>
  );
}

export default Edit;
