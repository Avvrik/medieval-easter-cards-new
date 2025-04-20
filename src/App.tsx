import React, { useState, useEffect } from 'react';
import './App.css';
import { cardBackgrounds, medievalPhrases } from './data/cardData';

function App() {
  const [currentCard, setCurrentCard] = useState(() => ({
    background: cardBackgrounds[Math.floor(Math.random() * cardBackgrounds.length)],
    phrase: medievalPhrases[Math.floor(Math.random() * medievalPhrases.length)]
  }));

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Preload the image
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
      setImageError(false);
    };
    img.onerror = () => {
      setImageError(true);
      setImageLoaded(false);
      console.error('Failed to load image:', currentCard.background.imageUrl);
    };
    img.src = currentCard.background.imageUrl;
  }, [currentCard.background.imageUrl]);

  const generateNewCard = () => {
    setImageLoaded(false);
    setImageError(false);
    setCurrentCard({
      background: cardBackgrounds[Math.floor(Math.random() * cardBackgrounds.length)],
      phrase: medievalPhrases[Math.floor(Math.random() * medievalPhrases.length)]
    });
  };

  return (
    <div className="App">
      <div className="content">
        <h1>Medieval Easter Cards</h1>
        <div className="card-container">
          <div 
            className="medieval-card"
            style={{
              backgroundImage: imageLoaded ? `url(${currentCard.background.imageUrl})` : 'none',
              backgroundColor: '#2c3e50'
            }}
          >
            {!imageLoaded && !imageError && (
              <div className="loading-message">Loading medieval artwork...</div>
            )}
            {imageError && (
              <div className="error-message">
                Failed to load image. Please try generating a new card.
              </div>
            )}
            <div className="card-message">
              {currentCard.phrase}
            </div>
          </div>
          <div className="button-container">
            <button className="medieval-button" onClick={generateNewCard}>
              Generate New Card
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
