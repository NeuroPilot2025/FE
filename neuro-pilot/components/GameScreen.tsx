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
import AnimatedBackground from "./AnimatedBackground";
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
    const [gameOverStatus, setGameOverStatus] = useState<string | null>(null);

    const enemiesDefeatedRef = useRef({ basic: 0, strong: 0 });
    const gameLoopRef = useRef<number | null>(null);
    const lastFireTimeRef = useRef<number>(0);
    const lastTickTimeRef = useRef<number>(performance.now());
    const enemyHitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
        null
    );

    const spawnEnemy = useCallback(() => {
        setEnemies((prevEnemies) => {
            if (prevEnemies.some((e) => !e.isDying) || gameOverStatus)
                return prevEnemies;

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
                if (!gameOverStatus) {
                    setGameOverStatus("YOU WON!");
                    onGameOver(elapsedTime, "YOU WON!");
                }
                return prevEnemies;
            }

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
            return [newEnemy];
        });
    }, [elapsedTime, gameOverStatus, onGameOver]);

    useEffect(() => {
        if (!gameOverStatus && enemies.filter((e) => !e.isDying).length === 0) {
            spawnEnemy();
        }
    }, [enemies, spawnEnemy, gameOverStatus]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (gameOverStatus) return;
            if (e.key === "ArrowLeft") setPlayerX(PLAYER_LEFT_X);
            else if (e.key === "ArrowRight") setPlayerX(PLAYER_RIGHT_X);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [gameOverStatus]);

    useEffect(() => {
        if (
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

            lastFireTimeRef.current = now;
            setCanFire(false);
            setTimeout(() => setCanFire(true), MISSILE_COOLDOWN_MS);
        }
    }, [playerX, canFire, gameOverStatus, enemies]);

    useEffect(() => {
        if (gameOverStatus) {
            if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
            return;
        }

        const gameTick = (timestamp: number) => {
            if (gameOverStatus) {
                if (gameLoopRef.current)
                    cancelAnimationFrame(gameLoopRef.current);
                return;
            }
            const deltaTime = (timestamp - lastTickTimeRef.current) / 1000;
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
                    .map((m) => ({ ...m, y: m.y - MISSILE_SPEED * (deltaTime * 60) }))
                    .filter((m) => m.y > -MISSILE_HEIGHT)
            );

            setEnemies((prev) =>
                prev.map((enemy) => {
                    if (enemy.isDying || enemy.health <= 0) return enemy;

                    let newHealth = enemy.health;
                    let wasHit = false;

                    const remainingMissiles = missiles.filter((missile) => {
                        if (
                            missile.x < enemy.x + ENEMY_WIDTH &&
                            missile.x + MISSILE_WIDTH > enemy.x &&
                            missile.y < enemy.y + ENEMY_HEIGHT &&
                            missile.y + MISSILE_HEIGHT > enemy.y
                        ) {
                            wasHit = true;
                            newHealth--;
                            return false;
                        }
                        return true;
                    });

                    if (wasHit) {
                        setMissiles(remainingMissiles);
                        const updatedEnemy = { ...enemy, health: newHealth, isHit: true };

                        if (newHealth <= 0) {
                            updatedEnemy.isDying = true;
                            if (updatedEnemy.type === EnemyType.BASIC)
                                enemiesDefeatedRef.current.basic++;
                            else enemiesDefeatedRef.current.strong++;

                            setTimeout(() => {
                                setEnemies((cur) => cur.filter((e) => e.id !== updatedEnemy.id));
                                if (updatedEnemy.type === EnemyType.STRONG &&
                                    enemiesDefeatedRef.current.strong >= TOTAL_STRONG_ENEMIES) {
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
                                        e.id === enemy.id ? { ...e, isHit: false } : e
                                    )
                                );
                            }, 150);
                        }
                        return updatedEnemy;
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
    }, [missiles, onGameOver, gameOverStatus, spawnEnemy]);

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
            </div>
        </div>
    );
};

export default GameScreen;
