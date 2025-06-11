
import React from 'react';
import { 
  PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_START_Y, 
  PLAYER_IMAGE_DEFAULT, PLAYER_IMAGE_WARRIOR, PLAYER_IMAGE_SWEET
} from '../constants';
import { SelectedBunny } from '../types';

interface PlayerProps {
  playerX: number;
  selectedBunny: SelectedBunny;
}

const Player: React.FC<PlayerProps> = ({ playerX, selectedBunny }) => {
  let playerImageSrc;
  switch (selectedBunny) {
    case SelectedBunny.OPTION_B: // Warrior Bunny
      playerImageSrc = PLAYER_IMAGE_WARRIOR;
      break;
    case SelectedBunny.OPTION_C: // Sweetheart Bunny
      playerImageSrc = PLAYER_IMAGE_SWEET;
      break;
    case SelectedBunny.DEFAULT: // Classic Bunny
    default:
      playerImageSrc = PLAYER_IMAGE_DEFAULT;
      break;
  }

  return (
    <div
      className="absolute" 
      style={{
        left: playerX,
        top: PLAYER_START_Y,
        width: PLAYER_WIDTH,
        height: PLAYER_HEIGHT,
      }}
      aria-label="Player Character"
    >
      {/* Combined Player Image (Bunny in Rocket) */}
      <img 
        src={playerImageSrc} 
        alt="Player" 
        className="w-full h-full object-contain pixelated"
      />
      
      {/* Rocket Flames Removed */}
    </div>
  );
};

export default Player;