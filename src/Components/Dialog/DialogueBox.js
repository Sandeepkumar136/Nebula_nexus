import React, { useEffect, useRef, useState } from "react";

const DialogueBox = ({ isOpen, onClose, children }) => {
  const dialogRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        setIsAnimating(true); // Start the closing animation
        setTimeout(() => {
          onClose(); // Close the dialogue box after the animation
          setIsAnimating(false); // Reset animation state
        }, 300); // Match the duration of your animation
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen && !isAnimating) return null;

  return (
    <div className={`dialogue-backdrop ${isAnimating ? "fade-out" : "fade-in"}`}>
      <div
        className={`dialogue-box ${isAnimating ? "slide-out" : "slide-in"}`}
        ref={dialogRef}
      >
        {children}
      </div>
    </div>
  );
};

export default DialogueBox;
