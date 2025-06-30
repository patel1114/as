import React, { useState, useContext, useEffect } from "react";
import { NoteContext } from "../context/NoteContext";

const COLOR_OPTIONS = [
  "#fffde7", // light yellow
  "#e3f2fd", // light blue
  "#fce4ec", // light pink
  "#e8f5e9", // light green
  "#f3e5f5", // light purple
  "#fbe9e7"  // light orange
];

function CreateArea({ forceExpand, onExpandEnd }) {
  const { addNote } = useContext(NoteContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const [note, setNote] = useState({
    title: "",
    content: "",
    priority: "medium",
    color: COLOR_OPTIONS[0],
    pinned: false
  });

  // Expand form if forceExpand is triggered (FAB click)
  useEffect(() => {
    if (forceExpand) {
      setIsExpanded(true);
      if (onExpandEnd) {
        setTimeout(onExpandEnd, 300);
      }
    }
  }, [forceExpand, onExpandEnd]);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setNote((prevNote) => {
      if (type === "checkbox") {
        return { ...prevNote, [name]: checked };
      }
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    event.preventDefault();
    if (note.title.trim() === "" || note.content.trim() === "") {
      alert("Please fill in both title and content fields");
      return;
    }
    addNote(note);
    setNote({
      title: "",
      content: "",
      priority: "medium",
      color: COLOR_OPTIONS[0],
      pinned: false
    });
    setIsExpanded(false);
  }

  function expand() {
    setIsExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            placeholder="Title"
            value={note.title}
            onChange={handleChange}
            aria-label="Note title"
          />
        )}
        <textarea
          name="content"
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
          value={note.content}
          onChange={handleChange}
          onClick={expand}
          aria-label="Note content"
        />
        {isExpanded && (
          <>
            <div style={{ marginBottom: "10px", display: "flex", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
              <label htmlFor="priority" style={{ marginRight: "10px" }}>
                Priority:
              </label>
              <select
                id="priority"
                name="priority"
                value={note.priority}
                onChange={handleChange}
                aria-label="Note priority"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <label htmlFor="color" style={{ marginLeft: "10px" }}>Color:</label>
              <select
                id="color"
                name="color"
                value={note.color}
                onChange={handleChange}
                style={{ background: note.color, border: "1px solid #ccc", borderRadius: "4px", padding: "2px 8px" }}
                aria-label="Note color"
              >
                {COLOR_OPTIONS.map((c) => (
                  <option key={c} value={c} style={{ background: c }}>{c}</option>
                ))}
              </select>
              <label style={{ marginLeft: "10px", display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  name="pinned"
                  checked={note.pinned}
                  onChange={handleChange}
                  style={{ marginRight: "5px" }}
                  aria-label="Pin note"
                />
                Pin
              </label>
            </div>
          </>
        )}
        <button onClick={submitNote} aria-label="Add note">+</button>
      </form>
    </div>
  );
}

export default CreateArea;