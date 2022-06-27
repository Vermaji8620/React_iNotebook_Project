import React from "react";
import { useContext } from "react";
import noteContext from "../context/notes/NoteContext";

const Home = () => {
  // useContext accepts a context object (the value returned from React.createContext) and returns the current context value, as given by the nearest context provider for the given context.
  const context = useContext(noteContext);
  const { notes, setNotes } = context;

  return (
    <div className="my-5">
      <h1>Add a NOTE</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <hr></hr>
      <div className="container my-3">
        <h1>Your Notes</h1>
        {notes.map((note) => {
          return note.title;
        })}
      </div>
    </div>
  );
};

export default Home;
