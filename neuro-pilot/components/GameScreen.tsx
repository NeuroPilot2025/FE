<<<<<<< Updated upstream
import React, { useState, useEffect, useCallback, useRef } from "react";
=======
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Missile, Enemy as EnemyInterface, EnemyType, SelectedBunny } from '../types';
import Player from './Player';
import EnemyComponent from './Enemy';
import MissileComponent from './Missile';
import AnimatedBackground from './AnimatedBackground';
import TimeIcon from '../img/Time.png';
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
import {
    Missile,
    Enemy as EnemyInterface,
    EnemyType,
    SelectedBunny,
} from "../types";
import Player from "./Player";
import EnemyComponent from "./Enemy";
import MissileComponent from "./Missile";
import AnimatedBackground from "./AnimatedBackground";
import Timer from "./Timer";
import Button from "./Button";
import {
    GAME_WIDTH,
    GAME_HEIGHT,
    PLAYER_START_Y,
    PLAYER_WIDTH,
    PLAYER_LEFT_X,
    PLAYER_RIGHT_X,
    MISSILE_WIDTH,
    MISSILE_HEIGHT,
    MISSILE_SPEED,
    MISSILE_COOLDOWN_MS,
    ENEMY_WIDTH,
    ENEMY_HEIGHT,
    ENEMY_START_Y,
    ENEMY_BASIC_HEALTH,
    ENEMY_STRONG_HEALTH,
    ENEMY_LEFT_X,
    ENEMY_RIGHT_X,
    TOTAL_BASIC_ENEMIES,
    TOTAL_STRONG_ENEMIES,
    MAX_GAME_DURATION_SECONDS,
    IMAGE_PATH_GAME_CLEAR,
    IMAGE_PATH_GAME_OVER_TIME_LIMIT,
    ENEMY_DEATH_DURATION_MS,
} from "../constants";

interface GameScreenProps {
    nickname: string;
    selectedBunny: SelectedBunny;
    onGameOver: (elapsedTime: number, message: string) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({
    nickname,
    selectedBunny,
    onGameOver,
}) => {
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
    const enemyHitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
        null
    );

<<<<<<< Updated upstream
    const spawnEnemy = useCallback(() => {
        setEnemies((prevEnemies) => {
            // Only spawn if no alive enemies and game not over
            if (prevEnemies.some((e) => !e.isDying) || gameOverStatus)
                return prevEnemies;
=======
  const spawnEnemy = useCallback(() => {
    setEnemies(prev => {
      if (prev.some(e => !e.isDying) || gameOverStatus) return prev;
      let type: EnemyType;
      let health: number;
      if (enemiesDefeatedRef.current.basic < TOTAL_BASIC_ENEMIES) {
        type = EnemyType.BASIC;
        health = ENEMY_BASIC_HEALTH;
      } else if (enemiesDefeatedRef.current.strong < TOTAL_STRONG_ENEMIES) {
        type = EnemyType.STRONG;
        health = ENEMY_STRONG_HEALTH;
      } else {
        return prev;
      }
      const side = Math.random() < 0.5 ? 'left' : 'right';
      const x = side === 'left' ? ENEMY_LEFT_X : ENEMY_RIGHT_X;
      const enemy: EnemyInterface = {
        id: `enemy-${Date.now()}-${Math.random()}`,
        x,
        y: ENEMY_START_Y,
        health,
        type,
        initialX: x,
        isHit: false,
        isDying: false,
      };
      return [...prev, enemy];
    });
  }, [gameOverStatus]);
>>>>>>> Stashed changes

            // Determine type for next enemy
            let newEnemyType: EnemyType;
            let newEnemyHealth: number;
            if (enemiesDefeatedRef.current.basic < TOTAL_BASIC_ENEMIES) {
                newEnemyType = EnemyType.BASIC;
                newEnemyHealth = ENEMY_BASIC_HEALTH;
            } else if (
                enemiesDefeatedRef.current.strong < TOTAL_STRONG_ENEMIES
            ) {
                newEnemyType = EnemyType.STRONG;
                newEnemyHealth = ENEMY_STRONG_HEALTH;
            } else {
                return prevEnemies;
            }

<<<<<<< Updated upstream
            const side = Math.random() < 0.5 ? "left" : "right";
            const enemyX = side === "left" ? ENEMY_LEFT_X : ENEMY_RIGHT_X;
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
            return [...prevEnemies, newEnemy];
        });
    }, [gameOverStatus]);

    useEffect(() => {
        if (!gameOverStatus && enemies.filter((e) => !e.isDying).length === 0) {
            spawnEnemy();
=======
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOverStatus) return;
      if (e.key === 'ArrowLeft') setPlayerX(PLAYER_LEFT_X);
      else if (e.key === 'ArrowRight') setPlayerX(PLAYER_RIGHT_X);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameOverStatus]);

  useEffect(() => {
    if (gameOverStatus || !canFire || enemies.filter(e => !e.isDying).length === 0) return;
    const now = Date.now();
    if (now - lastFireTimeRef.current > MISSILE_COOLDOWN_MS) {
      setMissiles(prev => [
        ...prev,
        { id: `missile-${Date.now()}-${Math.random()}`, x: playerX + PLAYER_WIDTH / 2 - MISSILE_WIDTH / 2, y: PLAYER_START_Y }
      ]);
      lastFireTimeRef.current = now;
      setCanFire(false);
      setTimeout(() => setCanFire(true), MISSILE_COOLDOWN_MS);
    }
  }, [playerX, canFire, gameOverStatus, enemies]);

  useEffect(() => {
    if (gameOverStatus) { cancelAnimationFrame(gameLoopRef.current!); return; }
    const tick = (t: number) => {
      const dt = (t - lastTickTimeRef.current) / 1000;
      lastTickTimeRef.current = t;

      setElapsedTime(prev => {
        const next = prev + dt;
        if (next >= MAX_GAME_DURATION_SECONDS) {
          setGameOverStatus('TIME LIMIT REACHED!');
          onGameOver(MAX_GAME_DURATION_SECONDS, 'TIME LIMIT REACHED!');
          return MAX_GAME_DURATION_SECONDS;
        }
        return next;
      });

      setMissiles(prev => prev.map(m => ({ ...m, y: m.y - MISSILE_SPEED * dt * 60 })).filter(m => m.y > -MISSILE_HEIGHT));

      setEnemies(prev => prev.map(e => {
        if (e.isDying) return e;
        let hp = e.health;
        let hit = false;
        const remaining = missiles.filter(m => {
          const collided = m.x < e.x + ENEMY_WIDTH && m.x + MISSILE_WIDTH > e.x && m.y < e.y + ENEMY_HEIGHT && m.y + MISSILE_HEIGHT > e.y;
          if (collided) { hp--; hit = true; return false; }
          return true;
        });
        if (hit) {
          setMissiles(remaining);
          const updated = { ...e, health: hp, isHit: true };
          if (hp <= 0) {
            updated.isDying = true;
            if (updated.type === EnemyType.BASIC) enemiesDefeatedRef.current.basic++;
            else enemiesDefeatedRef.current.strong++;
            const lastStrong = updated.type === EnemyType.STRONG && enemiesDefeatedRef.current.strong >= TOTAL_STRONG_ENEMIES;
            setTimeout(() => {
              setEnemies(cur => cur.filter(x => x.id !== updated.id));
              if (lastStrong) { setGameOverStatus('YOU WON!'); onGameOver(elapsedTime, 'YOU WON!'); }
              else spawnEnemy();
            }, ENEMY_DEATH_DURATION_MS);
          } else {
            setTimeout(() => setEnemies(cur => cur.map(x => x.id === e.id ? { ...x, isHit: false } : x)), 150);
          }
          return updated;
<<<<<<< Updated upstream
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
        }
    }, [enemies, spawnEnemy, gameOverStatus]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (isPaused || gameOverStatus) return;
            if (e.key === "ArrowLeft") setPlayerX(PLAYER_LEFT_X);
            else if (e.key === "ArrowRight") setPlayerX(PLAYER_RIGHT_X);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isPaused, gameOverStatus]);

<<<<<<< Updated upstream
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    useEffect(() => {
        if (
            isPaused ||
            gameOverStatus ||
            !canFire ||
            enemies.filter((e) => !e.isDying).length === 0
        )
            return;

        const now = Date.now();
        if (now - lastFireTimeRef.current > MISSILE_COOLDOWN_MS) {
            setMissiles((prev) => [
                ...prev,
                {
                    id: `missile-${Date.now()}`,
                    x: playerX + PLAYER_WIDTH / 2 - MISSILE_WIDTH / 2,
                    y: PLAYER_START_Y,
                },
            ]);
<<<<<<< Updated upstream
            lastFireTimeRef.current = now;
            setCanFire(false);
            setTimeout(() => setCanFire(true), MISSILE_COOLDOWN_MS);
        }
    }, [playerX, canFire, isPaused, gameOverStatus, enemies]);

=======

            lastFireTimeRef.current = now;
            setCanFire(false);
            setTimeout(() => setCanFire(true), MISSILE_COOLDOWN_MS);
        }
    }, [playerX, canFire, isPaused, gameOverStatus, enemies]);

>>>>>>> Stashed changes
    useEffect(() => {
        if (isPaused || gameOverStatus) {
            if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
            return;
        }

        const gameTick = (timestamp: number) => {
            if (gameOverStatus) {
                if (gameLoopRef.current)
                    cancelAnimationFrame(gameLoopRef.current);
                return;
            }
<<<<<<< Updated upstream
            const deltaTime = (timestamp - lastTickTimeRef.current) / 1000;
=======
            const rawDelta = timestamp - lastTickTimeRef.current;
            const deltaTime = Math.max(rawDelta / 1000, 0); // 음수 방지

>>>>>>> Stashed changes
            lastTickTimeRef.current = timestamp;

            setElapsedTime((prev) => {
                const next = prev + deltaTime;
                if (next >= MAX_GAME_DURATION_SECONDS) {
                    setGameOverStatus("TIME LIMIT REACHED!");
                    onGameOver(
                        MAX_GAME_DURATION_SECONDS,
                        "TIME LIMIT REACHED!"
                    );
                    return MAX_GAME_DURATION_SECONDS;
                }
                return next;
            });

            setMissiles((prev) =>
                prev
                    .map((m) => ({
                        ...m,
                        y: m.y - MISSILE_SPEED * (deltaTime * 60),
                    }))
                    .filter((m) => m.y > -MISSILE_HEIGHT)
            );

            setEnemies((prev) =>
                prev.map((enemy) => {
                    if (enemy.isDying) return enemy;

                    let newHealth = enemy.health;
                    let hit = false;

                    const remaining = missiles.filter((missile) => {
                        const collided =
                            missile.x < enemy.x + ENEMY_WIDTH &&
                            missile.x + MISSILE_WIDTH > enemy.x &&
                            missile.y < enemy.y + ENEMY_HEIGHT &&
                            missile.y + MISSILE_HEIGHT > enemy.y;
                        if (collided) {
                            newHealth--;
                            hit = true;
                            return false;
                        }
                        return true;
                    });

                    if (hit) {
                        setMissiles(remaining);
                        const updated = {
                            ...enemy,
                            health: newHealth,
                            isHit: true,
                        };

                        if (newHealth <= 0) {
                            updated.isDying = true;
                            if (updated.type === EnemyType.BASIC)
                                enemiesDefeatedRef.current.basic++;
                            else enemiesDefeatedRef.current.strong++;

                            const isLastStrong =
                                updated.type === EnemyType.STRONG &&
                                enemiesDefeatedRef.current.strong >=
                                    TOTAL_STRONG_ENEMIES;

                            setTimeout(() => {
                                setEnemies((cur) =>
                                    cur.filter((e) => e.id !== updated.id)
                                );
                                if (isLastStrong) {
                                    setGameOverStatus("YOU WON!");
                                    onGameOver(elapsedTime, "YOU WON!");
                                } else spawnEnemy();
                            }, ENEMY_DEATH_DURATION_MS);
                        } else {
                            if (enemyHitTimeoutRef.current)
                                clearTimeout(enemyHitTimeoutRef.current);
                            enemyHitTimeoutRef.current = setTimeout(() => {
                                setEnemies((cur) =>
                                    cur.map((e) =>
                                        e.id === enemy.id
                                            ? { ...e, isHit: false }
                                            : e
                                    )
                                );
                            }, 150);
                        }
                        return updated;
                    }
                    return enemy;
                })
            );

            gameLoopRef.current = requestAnimationFrame(gameTick);
        };

        lastTickTimeRef.current = performance.now();
        gameLoopRef.current = requestAnimationFrame(gameTick);

        return () => {
            if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
            if (enemyHitTimeoutRef.current)
                clearTimeout(enemyHitTimeoutRef.current);
        };
    }, [isPaused, missiles, onGameOver, gameOverStatus, spawnEnemy]);

    if (gameOverStatus) {
        let outcomeImageSrc = "";
        let altText = "";
        if (gameOverStatus === "YOU WON!") {
            outcomeImageSrc = IMAGE_PATH_GAME_CLEAR;
            altText = "Game Clear";
        } else {
            outcomeImageSrc = IMAGE_PATH_GAME_OVER_TIME_LIMIT;
            altText = "Game Over";
        }

        return (
            <div className="w-full h-full flex flex-col items-center justify-center relative bg-[#0c1445]">
                <AnimatedBackground />
                <div className="z-10 p-8 bg-black/70 rounded-lg text-center">
                    <img
                        src={outcomeImageSrc}
                        alt={altText}
                        className="max-w-sm mb-6 pixelated"
                    />
                    <p className="text-3xl text-white mt-2">
                        Final Time: {elapsedTime.toFixed(2)}s
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className="relative overflow-hidden shadow-2xl border-4 border-blue-800/70"
            style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
        >
            <AnimatedBackground />
            <div className="absolute inset-0 z-10">
                <Player playerX={playerX} selectedBunny={selectedBunny} />
                {enemies.map((enemy) => (
                    <EnemyComponent key={enemy.id} enemy={enemy} />
                ))}
                {missiles.map((missile) => (
                    <MissileComponent
                        key={missile.id}
                        x={missile.x}
                        y={missile.y}
                        selectedBunny={selectedBunny}
                    />
                ))}
                <Timer elapsedTime={elapsedTime} />
                <Button
                    onClick={() => setIsPaused(!isPaused)}
                    variant="secondary"
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm px-3 py-1 opacity-80 hover:opacity-100"
                    aria-label={isPaused ? "Resume Game" : "Pause Game"}
                >
                    {isPaused ? "RESUME" : "PAUSE"}
                </Button>
            </div>
        </div>
    );
=======
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
    // Render Game Over / Clear Screen
  if (gameOverStatus) {
    const src = gameOverStatus === 'YOU WON!' ? IMAGE_PATH_GAME_CLEAR : IMAGE_PATH_GAME_OVER_TIME_LIMIT;
    const alt = gameOverStatus === 'YOU WON!' ? 'Game Clear' : 'Game Over';
    return (
      <div className="w-full h-full flex flex-col items-center justify-center relative bg-[#0c1445]">
        <AnimatedBackground />
        <div className="z-10 p-8 bg-black/70 rounded-lg text-center">
          <img src={src} alt={alt} className="max-w-sm mb-6 pixelated" />
          <p className="text-3xl text-white mt-2">Final Time: {elapsedTime.toFixed(2)}s</p>
        </div>
      </div>
    );
  }

  // Main Game Screen
  return (
    <div className="relative overflow-hidden shadow-2xl border-4 border-blue-800/70" style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}>
      <AnimatedBackground />
      <div className="absolute inset-0 z-10">
        <Player playerX={playerX} selectedBunny={selectedBunny} />
        {enemies.map(e => <EnemyComponent key={e.id} enemy={e} />)}
        {missiles.map(m => <MissileComponent key={m.id} x={m.x} y={m.y} selectedBunny={selectedBunny} />)}
        {/* Display timer icon and elapsed time */}
        <div className="absolute top-4 right-4 flex flex-col items-center">
          <img src={TimeIcon} alt="Time" className="w-6 h-auto mb-1" />
          <div className="text-yellow-300 text-3xl font-bold">{elapsedTime.toFixed(2)}s</div>
        </div>
      </div>
    </div>
  );
>>>>>>> Stashed changes
};

export default GameScreen;
