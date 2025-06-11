import React from 'react';
import { Enemy as EnemyTypeInterface, EnemyType } from '../types';
import { 
  ENEMY_WIDTH, ENEMY_HEIGHT,
  RACCOON_IMG_DATA_NORMAL, RACCOON_IMG_DATA_ANGRY,
  RACCOON_BASIC_DEFEATED_IMAGE_PATH, RACCOON_STRONG_DEFEATED_IMAGE_PATH
} from '../constants';

interface EnemyProps {
  enemy: EnemyTypeInterface;
  scaleFactor?: number;       // 크기 조정 비율 (기본값 1)
  bottomPadding?: number;     // 바닥에서 올릴 간격(px)
  horizontalPadding?: number; // 오른쪽/왼쪽 공간 확보(padding, px)
}

const Enemy: React.FC<EnemyProps> = ({ 
  enemy, 
  scaleFactor = 1.8, 
  bottomPadding = -70, 
  horizontalPadding = 30
}) => {
  // 크기 계산
  const width = ENEMY_WIDTH * scaleFactor;
  const height = ENEMY_HEIGHT * scaleFactor;

  // 위치 보정
  const adjustedTop = enemy.y - bottomPadding;
  const adjustedLeft = enemy.x - horizontalPadding;

  // 이미지 소스 및 alt 결정
  let imgSrc: string;
  let altText: string;
  let commonClasses = 'pixelated';

  if (enemy.isDying) {
    imgSrc = enemy.type === EnemyType.STRONG
      ? RACCOON_STRONG_DEFEATED_IMAGE_PATH
      : RACCOON_BASIC_DEFEATED_IMAGE_PATH;
    altText = `패배한 ${enemy.type === EnemyType.STRONG ? '강한' : '일반'} 라쿤`;
    commonClasses += ' animate-shrink-fade';
  } else {
    imgSrc = enemy.type === EnemyType.STRONG
      ? RACCOON_IMG_DATA_ANGRY
      : RACCOON_IMG_DATA_NORMAL;
    altText = `${enemy.type === EnemyType.STRONG ? '강한' : '일반'} 라쿤 적`;
    if (enemy.isHit) commonClasses += ' opacity-60 animate-quick-shake';
  }

  return (
    <div
      className="absolute"
      style={{
        left: adjustedLeft,
        top: adjustedTop,
        width,
        height,
      }}
      aria-label={altText}
    >
      <img
        src={imgSrc}
        alt={altText}
        className={commonClasses}
        style={{
          width: '100%',
          height: 'auto',    // 원본 비율 유지
          maxHeight: '100%', // 컨테이너 넘지 않도록
        }}
      />
    </div>
  );
};

export default Enemy;
