
import React from 'react';

interface TimerProps {
  elapsedTime: number; // Changed from timeLeft
}

const Timer: React.FC<TimerProps> = ({ elapsedTime }) => {
  const formatTime = (totalSeconds: number): string => {
    // const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const milliseconds = Math.floor((totalSeconds * 100) % 100); // Two decimal places for milliseconds
    // return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`;
    return `${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}s`; // Simplified as per original image
  };

  return (
    <div className="absolute top-4 right-4 bg-black bg-opacity-50 px-4 py-2 rounded-lg">
      <p className="text-yellow-400 text-2xl font-bold game-font">
        ELAPSED: {formatTime(elapsedTime)}
      </p>
    </div>
  );
};

export default Timer;
