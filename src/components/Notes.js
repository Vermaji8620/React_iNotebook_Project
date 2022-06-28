import React from "react";
import { useContext } from "react";
import noteContext from "../context/notes/NoteContext";
import Notesitem from "./Notesitem";

const Notes = () => {
  // useContext accepts a context object (the value returned from React.createContext) and returns the current context value, as given by the nearest context provider for the given context.
  const context = useContext(noteContext);
  const { notes, setNotes } = context;
  return (
    <div className="row my-3">
      <h1>Your Notes</h1>
      {notes.map((note) => {
        return <Notesitem note={note} key={note._id}/>
      })}
    </div>
  );
};
export default Notes;
