import React, { useEffect, useState } from "react";
import "../style/RankScreen.css";
import Button from "./Button";
import { ScoreEntry } from "../types";
import {
    MAX_HIGH_SCORES,
    RACCOON_IMG_DATA_NORMAL,
    RACCOON_IMG_DATA_ANGRY,
    MAX_GAME_DURATION_SECONDS,
} from "../constants";

interface RankScreenProps {
    currentScore: number;
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

        const alreadyExists = scores.some(
            (s) => s.nickname === nickname && s.score === currentScore
        );

        if (!alreadyExists) {
            scores.push(newScoreEntry);
        }

        scores.sort((a, b) => a.score - b.score);

        setHighScores(scores);
        localStorage.setItem("neuroPilotHighScores", JSON.stringify(scores));
    }, [currentScore, nickname]);

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

    const topThree = highScores.slice(0, 3);
    const others = highScores.slice(3);

    return (
        <div className="RankPageBackGround">
            <div className="RankBackground">
                <div className="RankInfoBox">
                    <div className="RankTop3List">
                        <div className="RankTop3box">
                            <div className="RankTop2">
                                {topThree[1] && (
                                    <div className="ScoreList">
                                        <div className="TopRankScoreName">
                                            {topThree[1].nickname}
                                        </div>
                                        <div className="TopRankScoreBox">
                                            <div className="TopRankScoreBoxoInner">
                                                {topThree[1].score.toFixed(2)}s
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="RankTop1">
                                {topThree[0] && (
                                    <div className="ScoreList">
                                        <div className="TopRankScoreName">
                                            {topThree[0].nickname}
                                        </div>
                                        <div className="TopRankScoreBox">
                                            <div className="TopRankScoreBoxoInner">
                                                {topThree[0].score.toFixed(2)}s
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="RankTop3">
                                {topThree[2] && (
                                    <div className="ScoreList">
                                        <div className="TopRankScoreName">
                                            {topThree[2].nickname}
                                        </div>
                                        <div className="TopRankScoreBox">
                                            <div className="TopRankScoreBoxoInner">
                                                {topThree[2].score.toFixed(2)}s
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="RankElse">
                        <div className="RankelseBoxColor">
                            <div className="RankelseBox">
                                {highScores.length > 0 ? (
                                    <ul className="LowerScorelistBox">
                                        {highScores
                                            .slice(3)
                                            .map((entry, index) => (
                                                <li
                                                    key={`${entry.nickname}-${entry.score}-${entry.date}-${index}`}
                                                    className="LowerScoreListScore"
                                                >
                                                    <div className="LowerScoreList">
                                                        <div
                                                            className="Nickname"
                                                            title={
                                                                entry.nickname
                                                            }
                                                        >
                                                            {entry.nickname}
                                                        </div>
                                                        <div className="TimeBox">
                                                            {Math.round(
                                                                entry.score
                                                            )}
                                                            s
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                    </ul>
                                ) : (
                                    <p className="NoScoreList">
                                        No scores yet. Be the first to set a
                                        record!
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="ButtonOverlay">
                <Button
                    onClick={onReplay}
                    variant="image"
                    className="ReplaybtnBox"
                >
                    REPLAY
                </Button>
            </div>
        </div>
    );
};

export default RankScreen;
