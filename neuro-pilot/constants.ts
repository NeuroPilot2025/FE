export const GAME_WIDTH = 380;
export const GAME_HEIGHT = 680;

export const PLAYER_START_Y = GAME_HEIGHT - 100;
export const PLAYER_WIDTH = 60;
export const PLAYER_HEIGHT = 80;

export const PLAYER_COLUMN_OFFSET = GAME_WIDTH * 0.28;
export const PLAYER_LEFT_X = GAME_WIDTH / 2 - PLAYER_COLUMN_OFFSET - PLAYER_WIDTH / 2;
export const PLAYER_RIGHT_X = GAME_WIDTH / 2 + PLAYER_COLUMN_OFFSET - PLAYER_WIDTH / 2;

export const MISSILE_WIDTH = 10;
export const MISSILE_HEIGHT = 25;
export const MISSILE_SPEED = 12;
export const MISSILE_COOLDOWN_MS = 2000;

export const ENEMY_WIDTH = 70;
export const ENEMY_HEIGHT = 70;
export const ENEMY_START_Y = 60;

// Adjusted Enemy Health
export const ENEMY_BASIC_HEALTH = 2;
export const ENEMY_STRONG_HEALTH = 4;

export const TOTAL_BASIC_ENEMIES = 2;
export const TOTAL_STRONG_ENEMIES = 2;

export const ENEMY_LEFT_X = GAME_WIDTH / 2 - PLAYER_COLUMN_OFFSET - ENEMY_WIDTH / 2;
export const ENEMY_RIGHT_X = GAME_WIDTH / 2 + PLAYER_COLUMN_OFFSET - ENEMY_WIDTH / 2;

export const MAX_GAME_DURATION_SECONDS = 180;
export const MAX_HIGH_SCORES = 5;

// Base64 encoded data URL for the first raccoon image (basic)
// Replace with actual base64 data of 'racoon_basic.png'
export const RACCOON_IMG_DATA_NORMAL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAEZ0FNQQAIA Farragut';
// Base64 encoded data URL for the second raccoon image (strong/angry)
// Replace with actual base64 data of 'racoon_strong.png'
export const RACCOON_IMG_DATA_ANGRY = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAIGNIUk0AAHomAACAhAAA+gAAAIDoAAB1MAAA6mAAADqYAAAXcJy6UTwAAAAEZ0FNQQAIA FarragutAngry';

export const RACCOON_DEFEATED_SVG_DATA = `
  <svg viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
    <circle cx="35" cy="35" r="28" fill="#808080" opacity="0.6"/>
    <path d="M25 25 L45 45 M45 25 L25 45" stroke="#FFFFFF" stroke-width="5" stroke-linecap="round"/>
    <!-- Poof cloud elements -->
    <circle cx="20" cy="25" r="8" fill="lightgray" opacity="0.8"/>
    <circle cx="50" cy="25" r="10" fill="lightgray" opacity="0.8"/>
    <circle cx="35" cy="15" r="9" fill="lightgray" opacity="0.8"/>
    <circle cx="28" cy="48" r="12" fill="white" opacity="0.7"/>
    <circle cx="45" cy="45" r="7" fill="white" opacity="0.7"/>
  </svg>
`;


export const BUNNY_SVG_DATA_DEFAULT = `
  <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="50" cy="80" rx="30" ry="35" fill="white"/>
    <ellipse cx="50" cy="45" rx="25" ry="25" fill="white"/>
    <ellipse cx="35" cy="20" rx="8" ry="20" fill="white" transform="rotate(-15 35 20)"/>
    <ellipse cx="65" cy="20" rx="8" ry="20" fill="white" transform="rotate(15 65 20)"/>
    <ellipse cx="35" cy="20" rx="5" ry="15" fill="#FFC0CB" transform="rotate(-15 35 20)"/>
    <ellipse cx="65" cy="20" rx="5" ry="15" fill="#FFC0CB" transform="rotate(15 65 20)"/>
    <circle cx="42" cy="45" r="3" fill="black"/>
    <circle cx="58" cy="45" r="3" fill="black"/>
    <ellipse cx="50" cy="52" rx="3" ry="2" fill="#FF69B4"/>
    <ellipse cx="30" cy="85" rx="10" ry="7" fill="white"/>
    <ellipse cx="70" cy="85" rx="10" ry="7" fill="white"/>
  </svg>
`;

export const BUNNY_SVG_DATA_OPTION_B = `
  <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="50" cy="80" rx="30" ry="35" fill="#F0F0F0"/> <!-- Slightly grayer body -->
    <ellipse cx="50" cy="45" rx="25" ry="25" fill="#F0F0F0"/>
    <ellipse cx="35" cy="20" rx="8" ry="20" fill="#F0F0F0" transform="rotate(-15 35 20)"/>
    <ellipse cx="65" cy="20" rx="8" ry="20" fill="#F0F0F0" transform="rotate(15 65 20)"/>
    <ellipse cx="35" cy="20" rx="5" ry="15" fill="#ADD8E6" transform="rotate(-15 35 20)"/> <!-- Light blue inner ears -->
    <ellipse cx="65" cy="20" rx="5" ry="15" fill="#ADD8E6" transform="rotate(15 65 20)"/>
    <circle cx="42" cy="45" r="3" fill="black"/>
    <circle cx="58" cy="45" r="3" fill="black"/>
    <ellipse cx="50" cy="52" rx="3" ry="2" fill="#FFB6C1"/> <!-- Lighter pink nose -->
    <ellipse cx="30" cy="85" rx="10" ry="7" fill="#F0F0F0"/>
    <ellipse cx="70" cy="85" rx="10" ry="7" fill="#F0F0F0"/>
     <!-- Small blue bow tie -->
    <polygon points="45,60 55,60 52,65 55,70 45,70 48,65" fill="#87CEEB"/>
  </svg>
`;

export const BUNNY_SVG_DATA_OPTION_C = `
  <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="50" cy="80" rx="30" ry="35" fill="#FFFACD"/> <!-- Creamy body -->
    <ellipse cx="50" cy="45" rx="25" ry="25" fill="#FFFACD"/>
    <ellipse cx="35" cy="20" rx="8" ry="20" fill="#FFFACD" transform="rotate(-15 35 20)"/>
    <ellipse cx="65" cy="20" rx="8" ry="20" fill="#FFFACD" transform="rotate(15 65 20)"/>
    <ellipse cx="35" cy="20" rx="5" ry="15" fill="#FFDB58" transform="rotate(-15 35 20)"/> <!-- Mustard yellow inner ears -->
    <ellipse cx="65" cy="20" rx="5" ry="15" fill="#FFDB58" transform="rotate(15 65 20)"/>
    <circle cx="42" cy="45" r="3.5" fill="#2F4F4F"/> <!-- Dark slate gray eyes, slightly larger -->
    <circle cx="58" cy="45" r="3.5" fill="#2F4F4F"/>
    <ellipse cx="50" cy="52" rx="3" ry="2" fill="#D2691E"/> <!-- Chocolate nose -->
    <ellipse cx="30" cy="85" rx="10" ry="7" fill="#FFFACD"/>
    <ellipse cx="70" cy="85" rx="10" ry="7" fill="#FFFACD"/>
    <!-- Small star patch -->
    <polygon points="50,62 52,67 57,67 53,70 55,75 50,72 45,75 47,70 43,67 48,67" fill="#FFD700" opacity="0.8"/>
  </svg>
`;


export const CARROT_ROCKET_SVG_DATA = `
  <svg viewBox="0 0 60 100" xmlns="http://www.w3.org/2000/svg">
    <path d="M30 0 C 50 20, 55 50, 30 90 C 5 50, 10 20, 30 0 Z" fill="orange"/>
    <path d="M30 0 C 45 20, 50 50, 30 88 C 10 50, 15 20, 30 0 Z" fill="darkorange" transform="scale(0.95)" transform-origin="center"/>
    <polygon points="30,70 10,95 20,85" fill="green"/>
    <polygon points="30,70 50,95 40,85" fill="green"/>
    <polygon points="30,72 12,97 22,87" fill="darkgreen" transform="scale(0.9)" transform-origin="center"/>
    <polygon points="30,72 48,97 38,87" fill="darkgreen" transform="scale(0.9)" transform-origin="center"/>
    <circle cx="30" cy="35" r="12" fill="#ADD8E6" stroke="gray" stroke-width="1.5"/>
    <circle cx="30" cy="35" r="10" fill="#E0FFFF" />
  </svg>
`;

export const MISSILE_SVG_DATA = `
  <svg viewBox="0 0 10 25" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 0 L10 10 L8 25 L2 25 L0 10 Z" fill="yellow"/>
    <path d="M5 2 L9 10 L7.5 23 L2.5 23 L1 10 Z" fill="#FFD700"/>
    <ellipse cx="5" cy="20" rx="3" ry="5" fill="orange"/>
    <ellipse cx="5" cy="21" rx="2" ry="3" fill="red"/>
  </svg>
`;

export const FLAME_SVG_DATA = `
  <svg viewBox="-10 -5 20 15" xmlns="http://www.w3.org/2000/svg">
    <polygon points="0,0 -5,10 0,7 5,10" fill="orange"/>
    <polygon points="0,2 -3,10 0,8 3,10" fill="yellow"/>
  </svg>
`;
