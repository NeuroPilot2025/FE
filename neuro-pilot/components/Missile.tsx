
import React from 'react';
import { 
  MISSILE_WIDTH, MISSILE_HEIGHT,
  MISSILE_IMAGE_DEFAULT, MISSILE_IMAGE_WARRIOR, MISSILE_IMAGE_SWEET
} from '../constants';
import { SelectedBunny } from '../types';

interface MissileProps {
  x: number;
  y: number;
  selectedBunny: SelectedBunny; // To determine which missile image to use
}

const MissileComponent: React.FC<MissileProps> = ({ x, y, selectedBunny }) => {
  let missileImageSrc;
  switch (selectedBunny) {
    case SelectedBunny.OPTION_B: // Warrior Bunny's missile
      missileImageSrc = MISSILE_IMAGE_WARRIOR;
      break;
    case SelectedBunny.OPTION_C: // Sweetheart Bunny's missile
      missileImageSrc = MISSILE_IMAGE_SWEET;
      break;
    case SelectedBunny.DEFAULT: // Classic Bunny's missile
    default:
      missileImageSrc = MISSILE_IMAGE_DEFAULT;
      break;
  }

  return (
    <img
      src={missileImageSrc}
      alt="Missile"
      className="absolute pixelated"
      style={{
        left: x,
        top: y,
        width: MISSILE_WIDTH,
        height: MISSILE_HEIGHT,
      }}
    />
  );
};

export default MissileComponent;
