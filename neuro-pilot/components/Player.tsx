import React from 'react';
import { 
  PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_START_Y, 
  CARROT_ROCKET_SVG_DATA, FLAME_SVG_DATA,
  BUNNY_SVG_DATA_DEFAULT, BUNNY_SVG_DATA_OPTION_B, BUNNY_SVG_DATA_OPTION_C
} from '../constants';
import { SelectedBunny } from '../types';

interface PlayerProps {
  playerX: number;
  selectedBunny: SelectedBunny;
}

const Player: React.FC<PlayerProps> = ({ playerX, selectedBunny }) => {
  let bunnySvg;
  switch (selectedBunny) {
    case SelectedBunny.OPTION_B:
      bunnySvg = BUNNY_SVG_DATA_OPTION_B;
      break;
    case SelectedBunny.OPTION_C:
      bunnySvg = BUNNY_SVG_DATA_OPTION_C;
      break;
    case SelectedBunny.DEFAULT:
    default:
      bunnySvg = BUNNY_SVG_DATA_DEFAULT;
      break;
  }

  return (
    <div
      className="absolute pixelated"
      style={{
        left: playerX,
        top: PLAYER_START_Y,
        width: PLAYER_WIDTH,
        height: PLAYER_HEIGHT,
      }}
      aria-label="Player Character"
    >
      {/* Rocket Flames */}
      <div className="absolute bottom-[-25px] left-1/2 transform -translate-x-1/2 w-full flex justify-center" aria-hidden="true">
         <div className="w-10 h-10 animate-pulse" dangerouslySetInnerHTML={{__html: FLAME_SVG_DATA.replace('<svg', '<svg class="w-full h-full"')}} />
         <div className="w-12 h-12 animate-pulse delay-75" dangerouslySetInnerHTML={{__html: FLAME_SVG_DATA.replace('<svg', '<svg class="w-full h-full"')}} />
         <div className="w-10 h-10 animate-pulse delay-150" dangerouslySetInnerHTML={{__html: FLAME_SVG_DATA.replace('<svg', '<svg class="w-full h-full"')}} />
      </div>

      {/* Carrot Rocket */}
      <div 
        className="absolute bottom-0 left-0 w-full h-[80px]" 
        dangerouslySetInnerHTML={{ __html: CARROT_ROCKET_SVG_DATA.replace('<svg', '<svg class="w-full h-full"') }} 
        aria-hidden="true"
      />
      
      {/* Bunny inside rocket cockpit area */}
      <div 
        className="absolute bottom-[28px] left-1/2 transform -translate-x-1/2 w-[30px] h-[30px]"
        dangerouslySetInnerHTML={{ __html: bunnySvg.replace('<svg viewBox="0 0 100 120"', '<svg viewBox="20 5 60 70"') }} // Cropped view for head/ears
        aria-hidden="true"
      />
    </div>
  );
};

export default Player;
