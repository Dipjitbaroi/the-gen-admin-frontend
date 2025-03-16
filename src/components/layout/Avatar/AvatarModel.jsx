import React from "react";

const AvatarModal = ({ open, handleClose, imageUrl }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div className="bg-white p-4 rounded-lg shadow-lg relative">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 bg-gray-100 p-1 rounded-full"
        >
          ✕
        </button>
        <img
          src={imageUrl}
          alt="Avatar"
          className="max-w-full max-h-full rounded-lg"
        />
      </div>
    </div>
  );
};

export default AvatarModal;
