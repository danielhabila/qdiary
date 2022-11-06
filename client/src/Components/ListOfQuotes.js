import React from "react";

function ListOfQuotes(props) {
  return (
    <div className="mylist">
      {props.listOfQuotes.map((qotd, key) => {
        return (
          <div key={key}>
            <h1>Quote: {qotd.quote} </h1>
            <h3>Author: {qotd.author} </h3>
            <input
              type="text"
              ref={props.inputRef3}
              placeholder="Edit Quote..."
              onChange={(e) => {
                props.setUpdateQuote(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Edit Author Name..."
              onChange={(e) => {
                props.setUpdateAuthor(e.target.value);
              }}
            />
            <button onClick={() => props.updateDBitem(qotd._id)}>Update</button>
            <button onClick={() => props.deleteDBitem(qotd._id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default ListOfQuotes;
