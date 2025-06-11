
export const GAME_WIDTH = 380;
export const GAME_HEIGHT = 680;

export const PLAYER_START_Y = GAME_HEIGHT - 100;
export const PLAYER_WIDTH = 60; // Assuming this width is for the new combined player image
export const PLAYER_HEIGHT = 80; // Assuming this height is for the new combined player image

export const PLAYER_COLUMN_OFFSET = GAME_WIDTH * 0.28;
export const PLAYER_LEFT_X = GAME_WIDTH / 2 - PLAYER_COLUMN_OFFSET - PLAYER_WIDTH / 2;
export const PLAYER_RIGHT_X = GAME_WIDTH / 2 + PLAYER_COLUMN_OFFSET - PLAYER_WIDTH / 2;

export const MISSILE_WIDTH = 15; // Adjusted slightly, can be fine-tuned with actual assets
export const MISSILE_HEIGHT = 35; // Adjusted slightly, can be fine-tuned with actual assets
export const MISSILE_SPEED = 12;
export const MISSILE_COOLDOWN_MS = 2000;

export const ENEMY_WIDTH = 70;
export const ENEMY_HEIGHT = 70;
export const ENEMY_START_Y = 60;

// Adjusted Enemy Health
export const ENEMY_BASIC_HEALTH = 2;
export const ENEMY_STRONG_HEALTH = 4;
// constants.ts
export const TOTAL_BASIC_ENEMIES  = 2;  // 일반 라쿤 두 번
export const TOTAL_STRONG_ENEMIES = 2;  // 강한 라쿤 두 번

export const ENEMY_LEFT_X = GAME_WIDTH / 2 - PLAYER_COLUMN_OFFSET - ENEMY_WIDTH / 2;
export const ENEMY_RIGHT_X = GAME_WIDTH / 2 + PLAYER_COLUMN_OFFSET - ENEMY_WIDTH / 2;

export const MAX_GAME_DURATION_SECONDS = 180;
export const MAX_HIGH_SCORES = 5;

// Base64 encoded data URL for the first raccoon image (basic)
export const RACCOON_IMG_DATA_NORMAL = 'img/Raccoon1.png'; // Placeholder for the first raccoon image, replace with actual Base64 data if needed
// Base64 encoded data URL for the second raccoon image (strong/angry)
export const RACCOON_IMG_DATA_ANGRY = 'img/Raccoon2.png'; // Placeholder for the second raccoon image, replace with actual Base64 data if needed

// Defeated Raccoon Image Paths
export const RACCOON_BASIC_DEFEATED_IMAGE_PATH = '/img/Raccoon1_Attack.png';
export const RACCOON_STRONG_DEFEATED_IMAGE_PATH = '/img/Raccoon2_Attack.png';

// Player Images (Combined Bunny + Rocket)
export const PLAYER_IMAGE_DEFAULT = '/img/Rabbit1_roket.png'; // For SelectedBunny.DEFAULT
export const PLAYER_IMAGE_WARRIOR = '/img/Rabbit2_roket.png'; // For SelectedBunny.OPTION_B
export const PLAYER_IMAGE_SWEET = '/img/Rabbit3_roket.png';   // For SelectedBunny.OPTION_C

// Missile Images (Unique per character)
export const MISSILE_IMAGE_DEFAULT = '/img/Rabbit1_Fire.png'; // For SelectedBunny.DEFAULT
export const MISSILE_IMAGE_WARRIOR = '/img/Rabbit2_Fire.png'; // For SelectedBunny.OPTION_B
export const MISSILE_IMAGE_SWEET = '/img/Rabbit3_Fire.png';   // For SelectedBunny.OPTION_C

export const FLAME_SVG_DATA = `
  <svg viewBox="-10 -5 20 15" xmlns="http://www.w3.org/2000/svg">
    <polygon points="0,0 -5,10 0,7 5,10" fill="orange"/>
    <polygon points="0,2 -3,10 0,8 3,10" fill="yellow"/>
  </svg>
`;

// Game Outcome Image Paths
export const IMAGE_PATH_GAME_CLEAR = '/img/GameClear.png';
export const IMAGE_PATH_GAME_OVER_TIME_LIMIT = '/img/GameOver.png';

// constants.ts
export const ENEMY_DEATH_DURATION_MS = 1000; // 죽는 이미지 1초 유지
