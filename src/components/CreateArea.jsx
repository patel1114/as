import React, { useState, useContext } from "react";
import { NoteProvider, NoteContext } from "../context/NoteContext";

function CreateArea() {
  const { addNote } = useContext(NoteContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const [note, setNote] = useState({
    title: "",
    content: "",
    priority: "medium"
  });

  function handleChange(event) {
    const { name, value } = event.target;
    
    setNote((prevNote) => {
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
      priority: "medium"
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
          />
        )}
        <textarea
          name="content"
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
          value={note.content}
          onChange={handleChange}
          onClick={expand}
        />
        {isExpanded && (
          <div style={{ marginBottom: "10px" }}>
            <label htmlFor="priority" style={{ marginRight: "10px" }}>
              Priority:
            </label>
            <select
              id="priority"
              name="priority"
              value={note.priority}
              onChange={handleChange}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        )}
        <button onClick={submitNote}>+</button>
      </form>
    </div>
  );
}

export default CreateArea;