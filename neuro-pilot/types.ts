export enum GameState {
  START_SCREEN,
  PLAYING,
  GAME_OVER_SCREEN,
}

export interface CharacterPosition {
  x: number;
  y: number;
}

export interface Missile extends CharacterPosition {
  id: string;
}

export enum EnemyType {
  BASIC = 'BASIC',
  STRONG = 'STRONG',
}

export interface Enemy extends CharacterPosition {
  id: string;
  health: number;
  type: EnemyType;
  initialX: number;
  isHit: boolean;
  isDying?: boolean; // For death animation
}

export interface ScoreEntry {
  nickname: string;
  score: number; // Represents elapsed time
  date: string;
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
  retrievedContext?: {
    uri: string;
    title: string;
  };
}

export enum SelectedBunny {
  DEFAULT = 'DEFAULT',
  OPTION_B = 'OPTION_B', // Example: Different color accessory
  OPTION_C = 'OPTION_C', // Example: Slightly different ear pattern
}
