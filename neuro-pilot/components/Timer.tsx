import React from 'react';

interface TimerProps {
  elapsedTime: number; // Changed from timeLeft
}

const Timer: React.FC<TimerProps> = ({ elapsedTime }) => {
  const formatTime = (totalSeconds: number): string => {
    const seconds = Math.floor(totalSeconds % 60);
    const milliseconds = Math.floor((totalSeconds * 100) % 100); // Two decimal places for milliseconds
    return `${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}s`;
  };

  return (
    <div className="absolute top-4 right-4 bg-black bg-opacity-50 px-3 py-2 rounded-lg flex flex-col items-center">
      <img 
        src="/img/Time.png" 
        alt="Time" 
        className="mb-0.5 h-11 md:h-13 pixelated" // Increased height for larger display
      />
      <p className="text-yellow-400 text-2xl md:text-3xl font-bold game-font leading-none">
        {formatTime(elapsedTime)}
      </p>
    </div>
  );
};

export default Timer;
