import noteContext from "../context/notes/NoteContext";
import React, { useContext } from "react";

const Notesitem = (props) => {
  const context = useContext(noteContext);
  const { deletenote } = context;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        {/* <img src="..." className="card-img-top" alt="..." /> */}
        <div className="card-body">
          <h5 className="card-title">{props.note.title}</h5>
          <p className="card-text">{props.note.description}</p>
          <span>
            <i
              className="fa-solid fa-trash mx-2"
              style={{ cursor: "pointer" }}
              onClick={() => {
                deletenote(props.note._id);
              }}
            ></i>
          </span>
          <span>
            <i
              className="fa-solid fa-file-pen mx-2"
              style={{ cursor: "pointer" }}
            ></i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Notesitem;
