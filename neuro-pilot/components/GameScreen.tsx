import React, { useState, useEffect, useCallback, useRef } from "react";
import {
    Missile,
    Enemy as EnemyInterface,
    EnemyType,
    SelectedBunny,
} from "../types";
import Player from "./Player";
import EnemyComponent from "./Enemy";
import MissileComponent from "./Missile";
import backgroundImage from "../img/Background_2.png";
import Timer from "./Timer";
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

const GameScreen: React.FC<GameScreenProps> = ({ nickname, selectedBunny, onGameOver }) => {
    const [playerX, setPlayerX] = useState<number>(PLAYER_LEFT_X);
    const [missiles, setMissiles] = useState<Missile[]>([]);
    const [enemies, setEnemies] = useState<EnemyInterface[]>([]);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [canFire, setCanFire] = useState<boolean>(true);
    const [gameOverStatus, setGameOverStatus] = useState<string | null>(null);

    const enemiesDefeatedRef = useRef({ basic: 0, strong: 0 });
    const gameLoopRef = useRef<number | null>(null);
    const lastFireTimeRef = useRef<number>(0);
    const lastTickTimeRef = useRef<number>(performance.now());

    const spawnEnemy = useCallback(() => {
        setEnemies(prev => {
            if (prev.some(e => !e.isDying) || gameOverStatus) return prev;
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
                return prev;
            }
            const side = Math.random() < 0.5 ? "left" : "right";
            const x = side === "left" ? ENEMY_LEFT_X : ENEMY_RIGHT_X;
            const newEnemy: EnemyInterface = {
                id: `enemy-${Date.now()}-${Math.random()}`,
                x,
                y: ENEMY_START_Y,
                health: newEnemyHealth,
                type: newEnemyType,
                initialX: x,
                isHit: false,
                isDying: false,
            };
            return [...prev, newEnemy];
        });
    }, [elapsedTime, gameOverStatus, onGameOver]);

    useEffect(() => {
        if (!gameOverStatus && enemies.filter(e => !e.isDying).length === 0) spawnEnemy();
    }, [enemies, spawnEnemy, gameOverStatus]);

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (gameOverStatus) return;
            if (e.key === "ArrowLeft") setPlayerX(PLAYER_LEFT_X);
            else if (e.key === "ArrowRight") setPlayerX(PLAYER_RIGHT_X);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [gameOverStatus]);

    useEffect(() => {
        if (gameOverStatus || !canFire || enemies.filter(e => !e.isDying).length === 0) return;
        const now = Date.now();
        if (now - lastFireTimeRef.current > MISSILE_COOLDOWN_MS) {
            setMissiles(prev => [...prev, {
                id: `missile-${Date.now()}`,
                x: playerX + PLAYER_WIDTH/2 - MISSILE_WIDTH/2,
                y: PLAYER_START_Y
            }]);
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
                    setGameOverStatus("TIME LIMIT REACHED!");
                    onGameOver(MAX_GAME_DURATION_SECONDS, "TIME LIMIT REACHED!");
                    return MAX_GAME_DURATION_SECONDS;
                }
                return next;
            });
            setMissiles(prev => prev
                .map(m => ({ ...m, y: m.y - MISSILE_SPEED * dt * 60 }))
                .filter(m => m.y > -MISSILE_HEIGHT)
            );
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
                            if (lastStrong) { setGameOverStatus("YOU WON!"); onGameOver(elapsedTime, "YOU WON!"); }
                            else spawnEnemy();
                        }, ENEMY_DEATH_DURATION_MS);
                    } else {
                        setTimeout(() => setEnemies(cur => cur.map(x => x.id === e.id ? { ...x, isHit: false } : x)), 150);
                    }
                    return updated;
                }
                return e;
            }));
            gameLoopRef.current = requestAnimationFrame(tick);
        };
        gameLoopRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(gameLoopRef.current!);
    }, [missiles, onGameOver, gameOverStatus, spawnEnemy]);

    // Game Over / Clear Screen
    if (gameOverStatus) {
        const src = gameOverStatus === 'YOU WON!' ? IMAGE_PATH_GAME_CLEAR : IMAGE_PATH_GAME_OVER_TIME_LIMIT;
        const alt = gameOverStatus === 'YOU WON!' ? 'Game Clear' : 'Game Over';
        return (
            <div className="relative w-full h-full">
                <img
                    src={backgroundImage}
                    alt="Background"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
                    <div className="p-8 rounded-lg text-center">
                        <img src={src} alt={alt} className="max-w-sm mb-6 pixelated" />
                        <p className="text-3xl text-yellow-400 mt-2">Time: {elapsedTime.toFixed(2)}s</p>
                    </div>
                </div>
            </div>
        );
    }

    // Main Game Screen
    return (
        <div className="relative overflow-hidden shadow-2xl border-4 border-blue-800/70" style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}>
            <img
                src={backgroundImage}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 z-10">
                <Player playerX={playerX} selectedBunny={selectedBunny} />
                {enemies.map(e => <EnemyComponent key={e.id} enemy={e} />)}
                {missiles.map(m => <MissileComponent key={m.id} x={m.x} y={m.y} selectedBunny={selectedBunny} />)}
                <Timer elapsedTime={elapsedTime} />
            </div>
        </div>
    );
};

export default GameScreen;
