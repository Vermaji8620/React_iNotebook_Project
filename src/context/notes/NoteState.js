import React, { useState } from "react";
// importing the notecontext where the context was made
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const notesinitial = [
    {
      _id: "62b9535776f8415d27007868",
      user: "62b952d676f8415d27007862",
      title: "This is aditya title",
      description: "this is aditya description",
      date: "2022-06-27T06:51:03.446Z",
      __v: 0,
    },
    {
      _id: "62b9535776f8415d27007868",
      user: "62b952d676f8415d27007862",
      title: "This is aditya title",
      description: "this is aditya description",
      date: "2022-06-27T06:51:03.446Z",
      __v: 0,
    },
    {
      _id: "62b9535776f8415d27007868",
      user: "62b952d676f8415d27007862",
      title: "This is aditya title",
      description: "this is aditya description",
      date: "2022-06-27T06:51:03.446Z",
      __v: 0,
    },
    {
      _id: "62b9535776f8415d27007868",
      user: "62b952d676f8415d27007862",
      title: "This is aditya title",
      description: "this is aditya description",
      date: "2022-06-27T06:51:03.446Z",
      __v: 0,
    },
    {
      _id: "62b9535776f8415d27007868",
      user: "62b952d676f8415d27007862",
      title: "This is aditya title",
      description: "this is aditya description",
      date: "2022-06-27T06:51:03.446Z",
      __v: 0,
    },
    {
      _id: "62b9535776f8415d27007868",
      user: "62b952d676f8415d27007862",
      title: "This is aditya title",
      description: "this is aditya description",
      date: "2022-06-27T06:51:03.446Z",
      __v: 0,
    },
    {
      _id: "62b9539076f8415d2700786b",
      user: "62b952d676f8415d27007862",
      title: "This is verma title",
      description: "this is verma description",
      date: "2022-06-27T06:52:00.505Z",
      __v: 0,
    },
  ];

  const [notes, setNotes] = useState(notesinitial);

  return (
    // by writing the syntax written below, we can say that we need to pass the state and the update
    // this is the way in which we need to write to pass on the desired things
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
