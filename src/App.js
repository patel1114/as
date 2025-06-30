// src/App.js
import React, { useState, useContext, useRef } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";
import FilterBar from "./components/FilterBar";
import { NoteProvider, NoteContext } from "./context/NoteContext";

function NoteList() {
  const { notes } = useContext(NoteContext);
  const [filters, setFilters] = useState({
    priority: "all",
    searchTerm: "",
    color: "all"
  });
  const [showArchive, setShowArchive] = useState(false);
  const [expandForm, setExpandForm] = useState(false);
  const formRef = useRef(null);

  // Handle filter changes from FilterBar
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Apply filters to notes
  const filteredNotes = notes.filter(note => {
    const matchesPriority = filters.priority === "all" || note.priority === filters.priority;
    const matchesColor = !filters.color || filters.color === "all" || note.color === filters.color;
    const matchesSearch = filters.searchTerm === "" || 
      note.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(filters.searchTerm.toLowerCase());
    return matchesPriority && matchesColor && matchesSearch;
  });

  // Split notes into pinned, others, and archived
  const pinnedNotes = filteredNotes.filter(n => n.pinned && !n.archived);
  const otherNotes = filteredNotes.filter(n => !n.pinned && !n.archived);
  const archivedNotes = filteredNotes.filter(n => n.archived);

  // FAB click handler
  const handleFabClick = () => {
    setExpandForm(true);
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  };

  return (
    <div>
      <FilterBar onFilterChange={handleFilterChange} />
      <div ref={formRef}>
        <CreateArea forceExpand={expandForm} onExpandEnd={() => setExpandForm(false)} />
      </div>
      <div style={{ textAlign: "right", margin: "0 10px 10px 0" }}>
        <button
          onClick={() => setShowArchive(a => !a)}
          style={{ background: showArchive ? "#f5ba13" : "#eee", color: showArchive ? "#fff" : "#333", border: "none", borderRadius: 4, padding: "6px 14px", cursor: "pointer", fontWeight: 600 }}
        >
          {showArchive ? "Hide Archive" : `Show Archive (${archivedNotes.length})`}
        </button>
      </div>
      {!showArchive && (
        <>
          {pinnedNotes.length > 0 && (
            <>
              <h3 style={{ marginLeft: 16, color: "#f5ba13" }}>Pinned</h3>
              <div className="main-notes-container">
                {pinnedNotes.map(note => (
                  <Note key={note.id} {...note} />
                ))}
              </div>
            </>
          )}
          {otherNotes.length > 0 && (
            <>
              {pinnedNotes.length > 0 && <h3 style={{ marginLeft: 16, color: "#888" }}>Others</h3>}
              <div className="main-notes-container">
                {otherNotes.map(note => (
                  <Note key={note.id} {...note} />
                ))}
              </div>
            </>
          )}
          {pinnedNotes.length === 0 && otherNotes.length === 0 && (
            <div style={{ textAlign: "center", marginTop: "50px", color: "#888" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 64, opacity: 0.3 }}>🗒️</span>
                <p>No notes found. Try changing your filters or add a new note.</p>
              </div>
            </div>
          )}
        </>
      )}
      {showArchive && (
        <>
          <h3 style={{ marginLeft: 16, color: "#388e3c" }}>Archived Notes</h3>
          <div className="main-notes-container">
            {archivedNotes.length === 0 ? (
              <div style={{ textAlign: "center", marginTop: "50px", color: "#888" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 64, opacity: 0.3 }}>📦</span>
                  <p>No archived notes.</p>
                </div>
              </div>
            ) : (
              archivedNotes.map(note => <Note key={note.id} {...note} />)
            )}
          </div>
        </>
      )}
      <button className="fab" aria-label="Add Note" onClick={handleFabClick}>
        +
      </button>
    </div>
  );
}

function App() {
  return (
    <NoteProvider>
      <div>
        <Header />
        <NoteList />
        <Footer />
      </div>
    </NoteProvider>
  );
}

export default App;