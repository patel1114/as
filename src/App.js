// src/App.js
import React, { useState, useContext, useRef } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import CreateArea from "./components/CreateArea";
import FilterBar from "./components/FilterBar";
import { NoteProvider, NoteContext } from "./context/NoteContext";

const NoteList = () => {
  const { notes } = useContext(NoteContext);
  const [filters, setFilters] = useState({
    priority: "all",
    searchTerm: "",
    color: "all"
  });
  const [showArchive, setShowArchive] = useState(false);
  const [expandForm, setExpandForm] = useState(false);
  const formRef = useRef(null);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const filteredNotes = notes.filter(note => {
    const matchesPriority = filters.priority === "all" || note.priority === filters.priority;
    const matchesColor = !filters.color || filters.color === "all" || note.color === filters.color;
    const matchesSearch = filters.searchTerm === "" || 
      note.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(filters.searchTerm.toLowerCase());
    return matchesPriority && matchesColor && matchesSearch;
  });

  const pinnedNotes = filteredNotes.filter(n => n.pinned && !n.archived);
  const otherNotes = filteredNotes.filter(n => !n.pinned && !n.archived);
  const archivedNotes = filteredNotes.filter(n => n.archived);

  const handleFabClick = () => {
    setExpandForm(true);
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 pb-24">
      <FilterBar onFilterChange={handleFilterChange} />
      <div ref={formRef}>
        <CreateArea forceExpand={expandForm} onExpandEnd={() => setExpandForm(false)} />
      </div>
      <div className="flex justify-end px-4 mb-2">
        <button
          onClick={() => setShowArchive(a => !a)}
          className={`rounded px-4 py-2 font-semibold transition-colors duration-200 ${showArchive ? "bg-blue-700 text-white" : "bg-blue-100 text-blue-700"}`}
        >
          {showArchive ? "Hide Archive" : `Show Archive (${archivedNotes.length})`}
        </button>
      </div>
      {!showArchive && (
        <>
          {pinnedNotes.length > 0 && (
            <>
              <h3 className="ml-4 text-blue-700 font-bold text-lg">Pinned</h3>
              <div className="main-notes-container">
                {pinnedNotes.map(note => (
                  <Note key={note.id} {...note} />
                ))}
              </div>
            </>
          )}
          {otherNotes.length > 0 && (
            <>
              {pinnedNotes.length > 0 && <h3 className="ml-4 text-gray-500 font-semibold text-md">Others</h3>}
              <div className="main-notes-container">
                {otherNotes.map(note => (
                  <Note key={note.id} {...note} />
                ))}
              </div>
            </>
          )}
          {pinnedNotes.length === 0 && otherNotes.length === 0 && (
            <div className="flex flex-col items-center mt-12 text-gray-400">
              <span className="text-6xl opacity-30">🗒️</span>
              <p>No notes found. Try changing your filters or add a new note.</p>
            </div>
          )}
        </>
      )}
      {showArchive && (
        <>
          <h3 className="ml-4 text-green-700 font-bold text-lg">Archived Notes</h3>
          <div className="main-notes-container">
            {archivedNotes.length === 0 ? (
              <div className="flex flex-col items-center mt-12 text-gray-400">
                <span className="text-6xl opacity-30">📦</span>
                <p>No archived notes.</p>
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
};

const App = () => (
  <NoteProvider>
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-blue-100">
      <Header />
      <NoteList />
      <Footer />
    </div>
  </NoteProvider>
);

export default App;