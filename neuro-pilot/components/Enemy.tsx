
import React from 'react';
import { Enemy as EnemyTypeInterface, EnemyType } from '../types';
import { 
  ENEMY_WIDTH, ENEMY_HEIGHT, 
  RACCOON_IMG_DATA_NORMAL, RACCOON_IMG_DATA_ANGRY,
  RACCOON_BASIC_DEFEATED_IMAGE_PATH, RACCOON_STRONG_DEFEATED_IMAGE_PATH
} from '../constants';

interface EnemyProps {
  enemy: EnemyTypeInterface;
}

const Enemy: React.FC<EnemyProps> = ({ enemy }) => {
  const commonStyles: React.CSSProperties = {
    left: enemy.x,
    top: enemy.y,
    width: ENEMY_WIDTH,
    height: ENEMY_HEIGHT,
    position: 'absolute',
  };

  if (enemy.isDying) {
    const defeatedImagePath = enemy.type === EnemyType.STRONG 
      ? RACCOON_STRONG_DEFEATED_IMAGE_PATH 
      : RACCOON_BASIC_DEFEATED_IMAGE_PATH;
    
    // 패배한 라쿤 이미지를 표시합니다.
    // 'animate-shrink-fade' 애니메이션은 opacity: 1에서 시작하므로 이미지가 보여야 합니다.
    return (
      <img
        src={defeatedImagePath}
        alt={`패배한 ${enemy.type === EnemyType.STRONG ? '강한' : '일반'} 라쿤`} // Alt 텍스트 개선
        style={commonStyles}
        className="pixelated animate-shrink-fade" 
      />
    );
  }

  // 살아있는 적의 로직
  let aliveEnemyClasses = 'pixelated';
  if (enemy.isHit) {
    aliveEnemyClasses += ' opacity-60 animate-quick-shake'; // 피격 시 시각적 피드백
  }
  
  const imgSrc = enemy.type === EnemyType.STRONG ? RACCOON_IMG_DATA_ANGRY : RACCOON_IMG_DATA_NORMAL;
  
  return (
    <img
      src={imgSrc}
      alt={`${enemy.type === EnemyType.STRONG ? '강한' : '일반'} 라쿤 적`} // Alt 텍스트 개선
      style={commonStyles}
      className={aliveEnemyClasses} 
    />
  );
};

export default Enemy;
