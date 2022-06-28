import React from "react";
import { useContext } from "react";
import noteContext from "../context/notes/NoteContext";
import Addnote from "./Addnote";
import Notesitem from "./Notesitem";

const Notes = () => {
  // useContext accepts a context object (the value returned from React.createContext) and returns the current context value, as given by the nearest context provider for the given context.
  const context = useContext(noteContext);
  // ye niche me jo 'notes' likha hua hai, ye NoteState se leke aaya hua hai (whaa pe jo khichdi banke export hua tha wo khichdi yaha pe import hua hai-)
  // notes ka matlb waha pe wo list hai jisme sb items dala hua hai---
  const { notes, addnote } = context;
  return (
    <>
      <Addnote />
      <div className="row my-3">
        <h1>Your Notes</h1>
        {notes.map((note) => {
          return <Notesitem note={note} key={note._id} />; // note= aur key= me ek tarah ka prop pass kiya ja rrha hai
        })}
      </div>
    </>
  );
};
export default Notes;
