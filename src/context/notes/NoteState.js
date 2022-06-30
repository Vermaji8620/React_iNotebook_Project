import React, { useState } from "react";
// importing the notecontext where the context was made
import NoteContext from "./NoteContext";

// yaha pe bol skte hai ki khichdi pak raha hai----
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesinitial = [];

  const [notes, setNotes] = useState(notesinitial);
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  // ADDING THE NOTES
  const addnote = async (title, description, tag) => {
    // api call
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiODFlMTlhNjg2MmQwMmYzZmNkOWY5In0sImlhdCI6MTY1NjIzMzU2NX0.7j7S29pgBqYPiv_XvklK8zG03QMAswJ9VkvCtpipBDo",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);
    // logic for adding
    console.log("adding anew note");
    const note = {
      _id: "62b9535776f8415d270078688",
      user: "62b952d676f8415d27007862",
      title: title,
      description: description,
      // tag: tag,
      date: "2022-06-27T06:52:00.505Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  // GETTING THE NOTES
  const getnote = async () => {
    // api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiODFlMTlhNjg2MmQwMmYzZmNkOWY5In0sImlhdCI6MTY1NjIzMzU2NX0.7j7S29pgBqYPiv_XvklK8zG03QMAswJ9VkvCtpipBDo",
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  // DELETE A NOTE

  // equal to ka baad me likha hua id wo id hai jo ki mera props se pass hoke aa rha hai...
  // equal to ka pehle wala id wo wala id hai jo upar me likha hua hai
  // kehne ka yeh matlb hai ki equal to k baad k id wala note barabar nai hona chhaiye kisi v id wale note ka jo ki equal to ke pehle me hai

  //logic to delete
  const deletenote = async (id) => {
    // api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiODFlMTlhNjg2MmQwMmYzZmNkOWY5In0sImlhdCI6MTY1NjIzMzU2NX0.7j7S29pgBqYPiv_XvklK8zG03QMAswJ9VkvCtpipBDo",
      },
    });
    const json = response.json();
    console.log(json);
    let newnotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newnotes);
  };
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  // EDIT A NOTE

  const editnote = async (id, title, description, tag) => {
    // API CALL
    const response = await fetch(
      `${host}/api/notes/updatenote/62b81ec7a6862d02f3fcd9fd`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiODFlMTlhNjg2MmQwMmYzZmNkOWY5In0sImlhdCI6MTY1NjIzMzU2NX0.7j7S29pgBqYPiv_XvklK8zG03QMAswJ9VkvCtpipBDo",
        },
        body: JSON.stringify({ title, description, tag }),
      }
    );
    const json = response.json();

    // logic to edit
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  // aur yaha pe bol skte hai ki jo v khichdi upar me paka wo sb ab bata rhaa hai---
  return (
    // by writing the syntax written below, we can say that we need to pass the state and the update
    // this is the way in which we need to write to pass on the desired things
    <NoteContext.Provider
      value={{ notes, setNotes, addnote, deletenote, editnote, getnote }} // bracket k andar me jo v hai wo sb wo khichdi hai jo ki baatne k liya hai... to koi v component k andar hm ye sb khichdi ko import kr skte hai...aur sb iske baad jo v kch likha hua hai, wo sb smajhne k koi jarurat nai hai.....ye sbka syntax aisa hi hota hai
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
