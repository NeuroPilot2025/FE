
import React from 'react';
import { MISSILE_WIDTH, MISSILE_HEIGHT, MISSILE_SVG_DATA } from '../constants';

interface MissileProps {
  x: number;
  y: number;
}

const MissileComponent: React.FC<MissileProps> = ({ x, y }) => {
  return (
    <div
      className="absolute pixelated"
      style={{
        left: x,
        top: y,
        width: MISSILE_WIDTH,
        height: MISSILE_HEIGHT,
      }}
      dangerouslySetInnerHTML={{ __html: MISSILE_SVG_DATA.replace('<svg', '<svg class="w-full h-full"') }}
    />
  );
};

export default MissileComponent;
