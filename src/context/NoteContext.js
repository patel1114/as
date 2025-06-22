// src/context/NoteContext.js
import React, { createContext, useState, useEffect } from "react";

export const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState(() => {
    // Get stored notes from localStorage or use default ones
    const storedNotes = localStorage.getItem("notes");
    return storedNotes
      ? JSON.parse(storedNotes)
      : [
          {
            id: 1,
            title: "Welcome to Keeper App",
            content: "This is your first note. You can add more notes using the form below.",
            priority: "medium",
            createdAt: new Date().toISOString()
          },
          {
            id: 2,
            title: "How to use",
            content: "1. Add notes using the form\n2. Delete notes with the trash icon\n3. Filter notes by priority\n4. Search notes by title or content",
            priority: "high",
            createdAt: new Date(Date.now() - 86400000).toISOString()
          }
        ];
  });

  useEffect(() => {
    // Save notes to localStorage whenever notes change
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (newNote) => {
    setNotes((prevNotes) => [
      ...prevNotes,
      {
        id: Date.now(),
        ...newNote,
        createdAt: new Date().toISOString()
      }
    ]);
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote }}>
      {children}
    </NoteContext.Provider>
  );
};