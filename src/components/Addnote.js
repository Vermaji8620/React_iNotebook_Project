import noteContext from "../context/notes/NoteContext";
import { useContext } from "react";
import React, { useState } from "react";

const Addnote = () => {
  // useContext accepts a context object (the value returned from React.createContext) and returns the current context value, as given by the nearest context provider for the given context.
  const context = useContext(noteContext);
  const { addnote } = context; // khichdi 'addnote' waha se mangwaya hua hai---
  const [note, setNote] = useState({ title: "", description: "", tag: "" }); // naya usestate bana rhe hai---
  //
  //
  //
  //
  //
  //
  //
  const onchange = (e) => {
    // niche me hm spread-operator ka use krrhe hai, iska matlb ki jo v kch note object ka andar me hai, wo sb rhe....lekin uske aage, jo v kch likha hua hai, wo sb note k andar overwrite ho jaye...
    setNote({ ...note, [e.target.name]: e.target.value }); // e.target tab likhte hai jb kisi textarea se koi writing extract krna hota hai--- yaha pe writing ko extract krke 'name' k andar set kr de rhe hai---
  };
  //
  //
  //
  //
  //
  //
  const handleclick = (e) => {
    e.preventDefault();
    addnote(note.title, note.description, note.tag); // addnote jo kchicdi import kiya hai hm isme, uske andar note.title aur note.description de de rhe hai, jo ki addnote funciton k andar ja rha hai, jo ki NoteState file me define kiya hai--- ye sb hoga jb 'Submit' button pe hm click krenge jiske wajah se handleclick function activate ho jayega--
  };
  //
  //
  //
  //
  //
  return (
    <div className="my-5">
      <strong>
        <h1>Add a NOTE</h1>
      </strong>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            <strong>Title</strong>
          </label>
          <input
            type="text"
            className="form-control"
            onChange={onchange}
            id="title"
            name="title"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            <strong>Description</strong>
          </label>
          <input
            type="text"
            className="form-control"
            onChange={onchange}
            name="description"
            id="description"
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleclick}>
          ADD NOTE
        </button>
      </form>
      <hr></hr>
    </div>
  );
};

export default Addnote;
