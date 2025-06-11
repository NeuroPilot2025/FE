import React from 'react';
import { Enemy as EnemyTypeInterface, EnemyType } from '../types';
import { 
  ENEMY_WIDTH, ENEMY_HEIGHT, 
  RACCOON_IMG_DATA_NORMAL, RACCOON_IMG_DATA_ANGRY, // Using image data URLs
  RACCOON_DEFEATED_SVG_DATA
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

  let className = `pixelated transition-opacity duration-200`;
  if (enemy.isDying) {
    className += ' animate-shrink-fade'; // Apply shrink and fade animation
  } else if (enemy.isHit) {
    className += ' opacity-60 animate-pulse'; // Simple pulse for hit, or could be a specific hit frame
  }


  if (enemy.isDying) {
    return (
      <div
        style={commonStyles}
        className={className}
        dangerouslySetInnerHTML={{ __html: RACCOON_DEFEATED_SVG_DATA.replace('<svg', '<svg class="w-full h-full"') }}
        aria-label="Defeated Enemy"
      />
    );
  }

  const imgSrc = enemy.type === EnemyType.STRONG ? RACCOON_IMG_DATA_ANGRY : RACCOON_IMG_DATA_NORMAL;
  
  return (
    <img
      src={imgSrc}
      alt={`Enemy ${enemy.type}`}
      style={commonStyles}
      className={className}
    />
  );
};

export default Enemy;
