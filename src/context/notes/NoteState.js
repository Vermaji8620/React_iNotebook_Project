import React, { useState } from "react";
// importing the notecontext where the context was made
import NoteContext from "./NoteContext";

// yaha pe bol skte hai ki khichdi pak raha hai----
const NoteState = (props) => {
  const notesinitial = [
    {
      _id: "62b9535776f8415d270078681",
      user: "62b952d676f8415d27007862",
      title: "This is aditya title",
      description: "this is aditya description",
      date: "2022-06-27T06:51:03.446Z",
      __v: 0,
    },
    {
      _id: "62b9535776f8415d270078682",
      user: "62b952d676f8415d27007862",
      title: "This is aditya title",
      description: "this is aditya description",
      date: "2022-06-27T06:51:03.446Z",
      __v: 0,
    },
    {
      _id: "62b9535776f8415d270078683",
      user: "62b952d676f8415d27007862",
      title: "This is aditya title",
      description: "this is aditya description",
      date: "2022-06-27T06:51:03.446Z",
      __v: 0,
    },
    {
      _id: "62b9535776f8415d270078684",
      user: "62b952d676f8415d27007862",
      title: "This is aditya title",
      description: "this is aditya description",
      date: "2022-06-27T06:51:03.446Z",
      __v: 0,
    },
    {
      _id: "62b9535776f8415d270078685",
      user: "62b952d676f8415d27007862",
      title: "This is aditya title",
      description: "this is aditya description",
      date: "2022-06-27T06:51:03.446Z",
      __v: 0,
    },
    {
      _id: "62b9535776f8415d270078686",
      user: "62b952d676f8415d27007862",
      title: "This is aditya title",
      description: "this is aditya description",
      date: "2022-06-27T06:51:03.446Z",
      __v: 0,
    },
    {
      _id: "62b9535776f8415d270078687",
      user: "62b952d676f8415d27007862",
      title: "This is verma title",
      description: "this is verma description",
      date: "2022-06-27T06:52:00.505Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesinitial);

  // adding the notes
  const addnote = (title, description, tag) => {
    // todo api call
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

  // delete a note
  // equal to ka baad me likha hua id wo id hai jo ki mera props se pass hoke aa rha hai...
  // equal to ka pehle wala id wo wala id hai jo upar me likha hua hai
  // kehne ka ye matlb hai ki agar equal to k baad walla id pehle wale id k barabar nai hai to notes k andar wo rhega nai to nai rhega
  const deletenote = (id) => {
    let newnotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newnotes);
  };

  //edit a note
  const editnote = () => {};

  // aur yaha pe bol skte hai ki jo v khichdi upar me paka wo sb ab bata rhaa hai---
  return (
    // by writing the syntax written below, we can say that we need to pass the state and the update
    // this is the way in which we need to write to pass on the desired things
    <NoteContext.Provider
      value={{ notes, setNotes, addnote, deletenote, editnote }} // bracket k andar me jo v hai wo sb wo khichdi hai jo ki baatne k liya hai... to koi v component k andar hm ye sb khichdi ko import kr skte hai...aur sb iske baad jo v kch likha hua hai, wo sb smajhne k koi jarurat nai hai.....ye sbka syntax aisa hi hota hai
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
