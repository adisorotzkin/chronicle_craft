
import React from 'react';

const CharacterLightbox = ({ character, onClose }) => {
  return (
    <div className="character-lightbox-overlay" onClick={onClose}>
      <div className='lightBoxContent'>
      <h3>{character.characterName}</h3>
      <div className="character-lightbox-content" onClick={(e) => e.stopPropagation()}>
        <img src={character.image} alt={character.characterName} />
        <button className='btn btn-dark' onClick={onClose}>Close</button>
      </div>
      {character.description}
      </div>
      
    </div>
  );
};

export default CharacterLightbox;
