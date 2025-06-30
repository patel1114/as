import React, { useContext } from "react";
import { NoteContext } from "../context/NoteContext";

function Note(props) {
  const {
    deleteNote,
    pinNote,
    unpinNote,
    archiveNote,
    unarchiveNote,
    setNoteColor
  } = useContext(NoteContext);
  
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

  const colorOptions = [
    "#fffde7", "#e3f2fd", "#fce4ec", "#e8f5e9", "#f3e5f5", "#fbe9e7"
  ];

  function handleDelete() {
    deleteNote(props.id);
  }
  function handlePin() {
    pinNote(props.id);
  }
  function handleUnpin() {
    unpinNote(props.id);
  }
  function handleArchive() {
    archiveNote(props.id);
  }
  function handleUnarchive() {
    unarchiveNote(props.id);
  }
  function handleColorChange(e) {
    setNoteColor(props.id, e.target.value);
  }

  return (
    <div
      className="note fade-in"
      style={{ backgroundColor: props.color || "#fffde7", border: props.pinned ? "2px solid #f5ba13" : undefined }}
      aria-label={props.title ? `Note: ${props.title}` : "Note"}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontWeight: 600, fontSize: "1.1em", marginBottom: 6 }}>{props.title}</h1>
        {props.pinned ? (
          <button title="Unpin" onClick={handleUnpin} style={{ color: "#f5ba13" }} aria-label="Unpin note">
            📌
          </button>
        ) : (
          <button title="Pin" onClick={handlePin} style={{ color: "#888" }} aria-label="Pin note">
            📍
          </button>
        )}
      </div>
      <p>{props.content}</p>
      <div style={dateStyle}>
        <span>Created: {formatDate(props.createdAt)}</span>
        <span style={{ marginLeft: "10px" }}>Priority: {props.priority}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: 8, gap: 8 }}>
        <select
          value={props.color || "#fffde7"}
          onChange={handleColorChange}
          style={{ background: props.color, border: "1px solid #ccc", borderRadius: 4, padding: "2px 8px", fontSize: "0.9em" }}
          title="Change note color"
          aria-label="Change note color"
        >
          {colorOptions.map((c) => (
            <option key={c} value={c} style={{ background: c }}>{c}</option>
          ))}
        </select>
        {props.archived ? (
          <button title="Unarchive" onClick={handleUnarchive} style={{ color: "#388e3c" }} aria-label="Unarchive note">
            🗃️
          </button>
        ) : (
          <button title="Archive" onClick={handleArchive} style={{ color: "#888" }} aria-label="Archive note">
            🗄️
          </button>
        )}
        <button title="Delete" onClick={handleDelete} aria-label="Delete note">
          <i className="fas fa-trash">🗑️</i>
        </button>
      </div>
    </div>
  );
}

export default Note;