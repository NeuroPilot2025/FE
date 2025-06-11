import React, { useState, useCallback } from 'react';
import StartScreen from './components/StartScreen';
import GameScreen from './components/GameScreen';
import RankScreen from './components/RankScreen';
import { GameState, SelectedBunny } from './types';
import { GAME_WIDTH, GAME_HEIGHT } from './constants';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.START_SCREEN);
  const [nickname, setNickname] = useState<string>('');
  const [selectedBunny, setSelectedBunny] = useState<SelectedBunny>(SelectedBunny.DEFAULT);
  const [finalTime, setFinalTime] = useState<number>(0);
  const [gameOutcomeMessage, setGameOutcomeMessage] = useState<string>('');

  const handlePlay = useCallback((name: string, bunny: SelectedBunny) => {
    setNickname(name);
    setSelectedBunny(bunny);
    setFinalTime(0); 
    setGameOutcomeMessage('');
    setGameState(GameState.PLAYING);
  }, []);

  const handleGameOver = useCallback((elapsedTimeValue: number, message: string) => {
    setFinalTime(elapsedTimeValue);
    setGameOutcomeMessage(message);
    setTimeout(() => {
        setGameState(GameState.GAME_OVER_SCREEN);
    }, 2000); // Short delay to show game over message on GameScreen
  }, []);

  const handleReplay = useCallback(() => {
    // Reset to StartScreen, nickname can persist or be cleared based on desired UX
    // For now, let's clear nickname for a fresh start.
    // setNickname(''); 
    setSelectedBunny(SelectedBunny.DEFAULT);
    setGameState(GameState.START_SCREEN);
  }, []);

  const renderScreen = () => {
    switch (gameState) {
      case GameState.START_SCREEN:
        return <StartScreen onPlay={handlePlay} initialNickname={nickname} />;
      case GameState.PLAYING:
        return <GameScreen 
                  nickname={nickname} 
                  selectedBunny={selectedBunny} 
                  onGameOver={handleGameOver} 
                />;
      case GameState.GAME_OVER_SCREEN:
        return <RankScreen 
                  currentScore={finalTime} // This is elapsedTime
                  nickname={nickname} 
                  gameOutcomeMessage={gameOutcomeMessage} 
                  onReplay={handleReplay} 
                />;
      default:
        return <StartScreen onPlay={handlePlay} initialNickname={nickname} />;
    }
  };

  return (
    <div 
      className="flex flex-col items-center justify-center bg-[#060920] overflow-hidden" 
      style={{ width: '100vw', height: '100vh' }}
    >
        <div 
            className="relative shadow-2xl overflow-hidden border-2 border-indigo-500/50" 
            style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
        >
            {renderScreen()}
        </div>
    </div>
  );
};

export default App;
