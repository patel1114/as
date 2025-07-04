import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="relative text-center w-full mt-10 py-4 bg-blue-900 text-blue-100 rounded-t-xl">
      <div className="flex items-center justify-center gap-2">
        <span className="text-xl text-blue-300">📝</span>
        <p className="m-0">Keeper App &copy; {currentYear}</p>
      </div>
    </footer>
  );
};

export default Footer;