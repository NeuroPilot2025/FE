import React from 'react';
import { 
  PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_START_Y, 
  PLAYER_IMAGE_DEFAULT, PLAYER_IMAGE_WARRIOR, PLAYER_IMAGE_SWEET
} from '../constants';
import { SelectedBunny } from '../types';

interface PlayerProps {
  playerX: number;
  selectedBunny: SelectedBunny;
  horizontalPadding?: number; // 좌우 패딩(px)
}

const SCALE_FACTOR = 1.4; // 플레이어 크기 조정 비율
const BOTTOM_PADDING = 60;     // 바닥과 약간의 간격을 위해 추가 상하 여백(px)

const Player: React.FC<PlayerProps> = ({ playerX, selectedBunny, horizontalPadding = 25 }) => {
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

  // 스케일 적용 시 중앙 정렬 및 바닥 보정
  const offsetX = (PLAYER_WIDTH * (SCALE_FACTOR - 1)) / 2;
  const offsetY = PLAYER_HEIGHT * (SCALE_FACTOR - 1) + BOTTOM_PADDING;

  return (
    <div
      className="absolute"
      style={{
        left: playerX - offsetX - horizontalPadding,  // 중앙 정렬 보정 + 좌우 패딩
        top: PLAYER_START_Y - offsetY,                // 바닥 간격 보정
        width: PLAYER_WIDTH * SCALE_FACTOR,
        height: PLAYER_HEIGHT * SCALE_FACTOR,
        transform: `scale(${SCALE_FACTOR})`,  
        transformOrigin: 'top left',
        zIndex: 1,
      }}
      aria-label="Player Character"
    >
      <img 
        src={playerImageSrc} 
        alt="Player" 
        className="w-full h-full object-contain pixelated"
      />
    </div>
  );
};

export default Player;
