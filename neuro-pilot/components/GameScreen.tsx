
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Missile, Enemy as EnemyInterface, EnemyType, SelectedBunny } from '../types';
import Player from './Player';
import EnemyComponent from './Enemy';
import MissileComponent from './Missile';
import AnimatedBackground from './AnimatedBackground';
import Timer from './Timer';
import Button from './Button';
import {
  GAME_WIDTH, GAME_HEIGHT, PLAYER_START_Y, PLAYER_WIDTH,
  PLAYER_LEFT_X, PLAYER_RIGHT_X,
  MISSILE_WIDTH, MISSILE_HEIGHT, MISSILE_SPEED, MISSILE_COOLDOWN_MS,
  ENEMY_WIDTH, ENEMY_HEIGHT, ENEMY_START_Y, 
  ENEMY_BASIC_HEALTH, ENEMY_STRONG_HEALTH, // Specific healths
  ENEMY_LEFT_X, ENEMY_RIGHT_X,
  TOTAL_BASIC_ENEMIES, TOTAL_STRONG_ENEMIES, MAX_GAME_DURATION_SECONDS
} from '../constants';

interface GameScreenProps {
  nickname: string;
  selectedBunny: SelectedBunny;
  onGameOver: (elapsedTime: number, message: string) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ nickname, selectedBunny, onGameOver }) => {
  const [playerX, setPlayerX] = useState<number>(PLAYER_LEFT_X);
  const [missiles, setMissiles] = useState<Missile[]>([]);
  const [enemies, setEnemies] = useState<EnemyInterface[]>([]);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [canFire, setCanFire] = useState<boolean>(true);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [gameOverStatus, setGameOverStatus] = useState<string | null>(null);

  const enemiesDefeatedRef = useRef({ basic: 0, strong: 0 });
  const gameLoopRef = useRef<number | null>(null);
  const lastFireTimeRef = useRef<number>(0);
  const lastTickTimeRef = useRef<number>(performance.now());
  const enemyHitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null); // For resetting isHit visual

  const spawnEnemy = useCallback(() => {
    setEnemies(prevEnemies => {
      // Only spawn if no active (non-dying) enemies exist
      if (prevEnemies.some(e => !e.isDying) || gameOverStatus) return prevEnemies;

      let newEnemyType: EnemyType;
      let newEnemyHealth: number;

      if (enemiesDefeatedRef.current.basic < TOTAL_BASIC_ENEMIES) {
        newEnemyType = EnemyType.BASIC;
        newEnemyHealth = ENEMY_BASIC_HEALTH;
      } else if (enemiesDefeatedRef.current.strong < TOTAL_STRONG_ENEMIES) {
        newEnemyType = EnemyType.STRONG;
        newEnemyHealth = ENEMY_STRONG_HEALTH;
      } else {
        if (!gameOverStatus) {
            setGameOverStatus("YOU WON!");
            onGameOver(elapsedTime, "YOU WON!");
        }
        return prevEnemies; // All enemies defeated
      }
      
      const side = Math.random() < 0.5 ? 'left' : 'right';
      const enemyX = side === 'left' ? ENEMY_LEFT_X : ENEMY_RIGHT_X;

      const newEnemy: EnemyInterface = {
        id: `enemy-${Date.now()}-${Math.random()}`,
        x: enemyX,
        y: ENEMY_START_Y,
        health: newEnemyHealth,
        type: newEnemyType,
        initialX: enemyX,
        isHit: false,
        isDying: false,
      };
      return [newEnemy]; // Replace with the new single enemy
    });
  }, [elapsedTime, onGameOver, gameOverStatus]);

  useEffect(() => {
    // Initial spawn or spawn when all active enemies are cleared
    if (enemies.filter(e => !e.isDying).length === 0 && !gameOverStatus) {
      spawnEnemy();
    }
  }, [enemies, spawnEnemy, gameOverStatus]);


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPaused || gameOverStatus) return;
      if (e.key === 'ArrowLeft') setPlayerX(PLAYER_LEFT_X);
      else if (e.key === 'ArrowRight') setPlayerX(PLAYER_RIGHT_X);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPaused, gameOverStatus]);

  useEffect(() => {
    if (isPaused || gameOverStatus || !canFire || enemies.filter(e => !e.isDying).length === 0) return;

    const now = Date.now();
    if (now - lastFireTimeRef.current > MISSILE_COOLDOWN_MS) {
        setMissiles(prev => [
            ...prev,
            {
            id: `missile-${Date.now()}`,
            x: playerX + PLAYER_WIDTH / 2 - MISSILE_WIDTH / 2,
            y: PLAYER_START_Y,
            },
        ]);
        lastFireTimeRef.current = now;
        setCanFire(false); // Prevent immediate re-fire
        setTimeout(() => setCanFire(true), MISSILE_COOLDOWN_MS); 
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerX, canFire, isPaused, gameOverStatus, enemies]); // Check based on 'enemies' to allow firing when an enemy is present

   useEffect(() => {
    if (isPaused || gameOverStatus) {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
      return;
    }

    const gameTick = (timestamp: number) => {
      if (gameOverStatus) {
        if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
        return;
      }
      const deltaTime = (timestamp - lastTickTimeRef.current) / 1000;
      lastTickTimeRef.current = timestamp;

      setElapsedTime(prevTime => {
        const newTime = prevTime + deltaTime;
        if (newTime >= MAX_GAME_DURATION_SECONDS && !gameOverStatus) {
          setGameOverStatus("TIME LIMIT REACHED!");
          onGameOver(MAX_GAME_DURATION_SECONDS, "TIME LIMIT REACHED!");
          return MAX_GAME_DURATION_SECONDS;
        }
        return newTime;
      });

      setMissiles(prevMissiles =>
        prevMissiles
          .map(m => ({ ...m, y: m.y - MISSILE_SPEED * (deltaTime * 60) })) // deltaTime compensation
          .filter(m => m.y > -MISSILE_HEIGHT)
      );

      setEnemies(prevEnemies =>
        prevEnemies.map(enemy => {
          if (enemy.isDying || enemy.health <= 0) return enemy; // Skip already dying or defeated

          let newHealth = enemy.health;
          let wasHitThisFrame = false;

          const remainingMissiles = missiles.filter(missile => {
            if (
              missile.x < enemy.x + ENEMY_WIDTH &&
              missile.x + MISSILE_WIDTH > enemy.x &&
              missile.y < enemy.y + ENEMY_HEIGHT &&
              missile.y + MISSILE_HEIGHT > enemy.y
            ) {
              wasHitThisFrame = true;
              newHealth--;
              return false; // Missile is consumed
            }
            return true; // Missile remains
          });
          
          if(wasHitThisFrame) {
             setMissiles(remainingMissiles); // Update missiles state globally
             const updatedEnemy = { ...enemy, health: newHealth, isHit: true };

             if (newHealth <= 0) {
                updatedEnemy.isDying = true;
                updatedEnemy.isHit = false; // Don't show hit effect if dying
                
                if (updatedEnemy.type === EnemyType.BASIC) enemiesDefeatedRef.current.basic++;
                else enemiesDefeatedRef.current.strong++;
                
                // Remove after animation
                setTimeout(() => {
                    setEnemies(currentEnemies => currentEnemies.filter(e => e.id !== updatedEnemy.id));
                    // Spawn next enemy if conditions met (moved to useEffect for enemies list)
                }, 400); // Death animation duration
             } else {
                 // Reset isHit visual after a short period
                 if(enemyHitTimeoutRef.current) clearTimeout(enemyHitTimeoutRef.current);
                 enemyHitTimeoutRef.current = setTimeout(() => {
                     setEnemies(currentEnemies => currentEnemies.map(e => e.id === enemy.id ? {...e, isHit: false} : e));
                 }, 150); // Duration of hit flash
             }
             return updatedEnemy;
          }
          return enemy; // No collision with this enemy
        })
      );
      if(!gameOverStatus) gameLoopRef.current = requestAnimationFrame(gameTick);
    };

    lastTickTimeRef.current = performance.now();
    if (!gameOverStatus) gameLoopRef.current = requestAnimationFrame(gameTick);
    
    return () => {
      if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
      if (enemyHitTimeoutRef.current) clearTimeout(enemyHitTimeoutRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused, missiles, onGameOver, spawnEnemy, gameOverStatus]);


  if (gameOverStatus) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center relative bg-[#0c1445]">
        <AnimatedBackground />
        <div className="z-10 text-center p-8 bg-black/70 rounded-lg shadow-xl">
          <h2 className="text-6xl font-bold game-font text-yellow-400 mb-6" style={{ textShadow: '3px 3px 0px #800000' }}>
            {gameOverStatus === "TIME LIMIT REACHED!" ? "GAME OVER" : gameOverStatus.toUpperCase()}
          </h2>
           {gameOverStatus === "TIME LIMIT REACHED!" && <p className="text-2xl text-white mb-4">3분 시간 제한 도달!</p> }
          <p className="text-3xl text-white mb-8">Final Time: {elapsedTime.toFixed(2)}s</p>
          {/* Button to proceed to rank screen is handled by App.tsx timeout */}
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden shadow-2xl border-4 border-blue-800/70" style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}>
      <AnimatedBackground />
      <div className="absolute inset-0 z-10">
        <Player playerX={playerX} selectedBunny={selectedBunny} />
        {enemies.map(enemy => (
          <EnemyComponent key={enemy.id} enemy={enemy} />
        ))}
        {missiles.map(missile => (
          <MissileComponent key={missile.id} x={missile.x} y={missile.y} />
        ))}
        <Timer elapsedTime={elapsedTime} />
        {/* Points display removed */}
        <Button
            onClick={() => setIsPaused(!isPaused)}
            variant="secondary"
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm px-3 py-1 opacity-80 hover:opacity-100"
            aria-label={isPaused ? 'Resume Game' : 'Pause Game'}
        >
            {isPaused ? 'RESUME' : 'PAUSE'}
        </Button>
      </div>
    </div>
  );
};

export default GameScreen;
