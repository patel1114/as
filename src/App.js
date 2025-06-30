// src/App.js
import React, { useState, useContext } from "react";
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
    searchTerm: ""
  });

  // Handle filter changes from FilterBar
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Apply filters to notes
  const filteredNotes = notes.filter(note => {
    const matchesPriority = filters.priority === "all" || note.priority === filters.priority;
    const matchesSearch = filters.searchTerm === "" || 
      note.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(filters.searchTerm.toLowerCase());
    
    return matchesPriority && matchesSearch;
  });

  return (
    <div>
      <FilterBar onFilterChange={handleFilterChange} />
      <CreateArea />
      <div className="main-notes-container">
        {filteredNotes.length === 0 ? (
          <div style={{ textAlign: "center", marginTop: "50px", color: "#888" }}>
            <p>No notes found. Try changing your filters or add a new note.</p>
          </div>
        ) : (
          filteredNotes.map(note => (
            <Note
              key={note.id}
              id={note.id}
              title={note.title}
              content={note.content}
              priority={note.priority}
              createdAt={note.createdAt}
            />
          ))
        )}
      </div>
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