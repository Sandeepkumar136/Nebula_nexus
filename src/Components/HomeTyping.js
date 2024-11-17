import React from 'react'
import { useEffect, useState } from 'react';

const HomeTyping = () => {
    const words = [
        "Nasa.",
        "Astronauts.",
        "Earth.",
        "Universe.",
      ];
      const [currentWordIndex, setCurrentWordIndex] = useState(0);
      const [currentText, setCurrentText] = useState("");
      const [isDeleting, setIsDeleting] = useState(false);
      const [chartIndex, setChartIndex] = useState(0);
    
      useEffect(() => {
        const type = () => {
          const currentWord = words[currentWordIndex];
          const updatedText = isDeleting
            ? currentWord.substring(0, chartIndex - 1)
            : currentWord.substring(0, chartIndex + 1);
    
          setCurrentText(updatedText);
    
          if (!isDeleting && updatedText === currentWord) {
            setTimeout(() => setIsDeleting(true), 1000);
          } else if (isDeleting && updatedText === "") {
            setIsDeleting(false);
            setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
          }
    
          setChartIndex((prevIndex) => prevIndex + (isDeleting ? -1 : 1));
        };
    
        const typingSpeed = isDeleting ? 50 : 100;
        const timeout = setTimeout(type, typingSpeed);
    
        return () => clearTimeout(timeout);
      }, [currentText, isDeleting, chartIndex, words, currentWordIndex]);
  return (
    <>
      <section className="section-home">
        <div className="index-text-section">
          <div className="heading-contain">
            <h2>
            Explore the Cosmos with {currentText}
            </h2>
          </div>
          <p className="text-contain-index-pera">
          NASA, the U.S. space agency, leads space exploration, scientific discovery, aeronautics research, and technological innovation for understanding our universe.
          </p>
          <div className="button-index-contain">
            <button type="button" id="Closelink">
              explore
            </button>
          </div>
        </div>
        <div className="img-index-contain">
          <img
            src="https://i.ibb.co/P4xdxrF/astronaut-6351790-1280.jpg"
            alt="basepfodle"
            id="img-main"
          />
        </div>
      </section>
    </>
  )
}

export default HomeTyping;