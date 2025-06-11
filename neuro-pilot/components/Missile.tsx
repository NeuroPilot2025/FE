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
  scaleFactor?: number;         // 크기 조정 비율 (기본값 1)
  horizontalPadding?: number;   // 좌우 패딩(px)
}

const MissileComponent: React.FC<MissileProps> = ({
  x,
  y,
  selectedBunny,
  scaleFactor = 3,
  horizontalPadding = 23,
}) => {
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

  // 크기 계산
  const width = MISSILE_WIDTH * scaleFactor;
  const height = MISSILE_HEIGHT * scaleFactor;

  return (
    <img
      src={missileImageSrc}
      alt="Missile"
      className="absolute pixelated"
      style={{
        left: x - horizontalPadding,  // 좌우 패딩 보정
        top: y,
        width,
        height,
      }}
    />
  );
};

export default MissileComponent;
