import React, { useEffect, useState } from "react";
import Button from "./Button";
import { ScoreEntry } from "../types";
import {
    MAX_HIGH_SCORES,
    RACCOON_IMG_DATA_NORMAL,
    RACCOON_IMG_DATA_ANGRY,
    MAX_GAME_DURATION_SECONDS,
} from "../constants"; // Using image data

interface RankScreenProps {
    currentScore: number; // This is elapsed time
    nickname: string;
    gameOutcomeMessage: string;
    onReplay: () => void;
}

const RankScreen: React.FC<RankScreenProps> = ({
    currentScore,
    nickname,
    gameOutcomeMessage,
    onReplay,
}) => {
    const [highScores, setHighScores] = useState<ScoreEntry[]>([]);

    useEffect(() => {
        const storedScoresRaw = localStorage.getItem("neuroPilotHighScores");
        let scores: ScoreEntry[] = storedScoresRaw
            ? JSON.parse(storedScoresRaw)
            : [];

        const newScoreEntry: ScoreEntry = {
            nickname,
            score: currentScore,
            date: new Date().toLocaleDateString(),
        };

        // ✅ 중복 방지 추가
        const alreadyExists = scores.some(
            (s) => s.nickname === nickname && s.score === currentScore
        );

        if (!alreadyExists) {
            scores.push(newScoreEntry);
        }

        scores.sort((a, b) => a.score - b.score);
        scores = scores.slice(0, MAX_HIGH_SCORES);

        setHighScores(scores);
        localStorage.setItem("neuroPilotHighScores", JSON.stringify(scores));
    }, [currentScore, nickname]);
    // gameOutcomeMessage removed as it doesn't affect score logic here

    const getMedal = (index: number): string => {
        if (index === 0) return "🥇";
        if (index === 1) return "🥈";
        if (index === 2) return "🥉";
        return `${index + 1}.`;
    };

    const maxTimeForBar =
        highScores.length > 0
            ? Math.max(
                  ...highScores.map((s) => s.score),
                  MAX_GAME_DURATION_SECONDS
              )
            : MAX_GAME_DURATION_SECONDS;

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#0c1445] to-[#1f2a68] text-white relative">
            <img
                src={RACCOON_IMG_DATA_NORMAL}
                alt="Raccoon"
                className="absolute top-8 left-8 w-20 h-20 opacity-50 pixelated transform -rotate-12"
            />
            <img
                src={RACCOON_IMG_DATA_ANGRY}
                alt="Angry Raccoon"
                className="absolute top-8 right-8 w-20 h-20 opacity-50 pixelated transform rotate-12"
            />

            <div className="text-center mb-6 game-font">
                <h1
                    className="text-6xl font-bold text-yellow-400"
                    style={{ textShadow: "3px 3px 0px #8B4513" }}
                >
                    {gameOutcomeMessage === "YOU WON!"
                        ? "VICTORY!"
                        : gameOutcomeMessage === "TIME LIMIT REACHED!"
                        ? "GAME OVER"
                        : "RESULTS"}
                </h1>
                {gameOutcomeMessage && (
                    <p className="text-xl text-gray-300 mt-2">
                        {gameOutcomeMessage.toUpperCase()}
                    </p>
                )}
                <p className="text-2xl text-orange-400 mt-1">
                    Your Time: {currentScore.toFixed(2)}s
                </p>
            </div>

            <div className="bg-blue-900/70 p-6 rounded-xl shadow-2xl w-full max-w-md border-2 border-yellow-500/70">
                <h2 className="text-4xl font-bold text-center mb-6 text-yellow-300 game-font">
                    RANKING (FASTEST TIMES)
                </h2>
                {highScores.length > 0 ? (
                    <ul className="space-y-3">
                        {highScores.map((entry, index) => (
                            <li
                                key={`${entry.nickname}-${entry.score}-${entry.date}-${index}`}
                                className={`flex items-center justify-between p-3 rounded-lg shadow-md transition-all duration-300 ${
                                    entry.nickname === nickname &&
                                    entry.score === currentScore
                                        ? "bg-yellow-600/40 border-2 border-yellow-400 scale-105 ring-2 ring-yellow-300"
                                        : "bg-blue-800/60 hover:bg-blue-700/60"
                                }`}
                            >
                                <div className="flex items-center">
                                    <span className="text-xl font-bold w-10 text-yellow-200">
                                        {getMedal(index)}
                                    </span>
                                    <span
                                        className="text-lg text-gray-100 truncate w-32 md:w-40"
                                        title={entry.nickname}
                                    >
                                        {entry.nickname}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <span className="text-lg font-semibold text-green-300 mr-2">
                                        {entry.score.toFixed(2)}s
                                    </span>
                                    <div className="w-16 h-4 bg-gray-700 rounded-full overflow-hidden border border-gray-500">
                                        <div
                                            className="h-full bg-gradient-to-r from-green-400 to-lime-500 rounded-full transition-width duration-500 ease-out"
                                            style={{
                                                width: `${Math.max(
                                                    5,
                                                    Math.min(
                                                        100,
                                                        (entry.score /
                                                            Math.max(
                                                                maxTimeForBar,
                                                                1
                                                            )) *
                                                            100
                                                    )
                                                )}%`,
                                            }}
                                        />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-400 py-4">
                        No scores yet. Be the first to set a record!
                    </p>
                )}
            </div>

            <Button
                onClick={onReplay}
                variant="success"
                className="mt-8 text-2xl px-10 py-4 game-font tracking-wider"
            >
                REPLAY
            </Button>
        </div>
    );
};

export default RankScreen;
