import React, { useContext } from "react";
import { NoteContext } from "../context/NoteContext";

function Note(props) {
  const { deleteNote } = useContext(NoteContext);
  
  const priorityColors = {
    low: "#e0f7fa",
    medium: "#fff9c4",
    high: "#ffcdd2"
  };
  
  const noteStyle = {
    backgroundColor: priorityColors[props.priority] || "#fff",
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const dateStyle = {
    fontSize: "0.7rem",
    color: "#888",
    marginTop: "5px"
  };

  function handleDelete() {
    deleteNote(props.id);
  }

  return (
    <div className="note" style={noteStyle}>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <div style={dateStyle}>
        <span>Created: {formatDate(props.createdAt)}</span>
        <span style={{ marginLeft: "10px" }}>Priority: {props.priority}</span>
      </div>
      <button onClick={handleDelete}>
        <i className="fas fa-trash">🗑️</i>
      </button>
    </div>
  );
}

export default Note;