// src/components/Header.jsx
import React from "react";

const Header = () => (
  <header className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-700 to-blue-300 shadow-md py-6 rounded-b-2xl">
    <div className="text-3xl bg-gradient-to-br from-blue-700 to-blue-400 text-white rounded-xl px-3 py-1 shadow-md" aria-label="Keeper App Logo">📝</div>
    <h1 className="text-white font-mclaren font-bold text-2xl tracking-wide flex items-center">
      Keeper <span className="text-blue-200 font-extrabold ml-1">App</span>
    </h1>
  </header>
);

export default Header;