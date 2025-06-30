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
            createdAt: new Date().toISOString(),
            pinned: false,
            archived: false,
            color: "#fffde7"
          },
          {
            id: 2,
            title: "How to use",
            content: "1. Add notes using the form\n2. Delete notes with the trash icon\n3. Filter notes by priority\n4. Search notes by title or content",
            priority: "high",
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            pinned: true,
            archived: false,
            color: "#e3f2fd"
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
        createdAt: new Date().toISOString(),
        pinned: newNote.pinned || false,
        archived: false,
        color: newNote.color || "#fffde7"
      }
    ]);
  };

  const deleteNote = (id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const pinNote = (id) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, pinned: true } : note
      )
    );
  };

  const unpinNote = (id) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, pinned: false } : note
      )
    );
  };

  const archiveNote = (id) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, archived: true, pinned: false } : note
      )
    );
  };

  const unarchiveNote = (id) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, archived: false } : note
      )
    );
  };

  const setNoteColor = (id, color) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, color } : note
      )
    );
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        addNote,
        deleteNote,
        pinNote,
        unpinNote,
        archiveNote,
        unarchiveNote,
        setNoteColor
      }}
    >
      {children}
    </NoteContext.Provider>
  );
};