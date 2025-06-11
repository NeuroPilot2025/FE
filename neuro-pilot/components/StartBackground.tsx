import React, { useMemo } from "react";
import { GAME_WIDTH, GAME_HEIGHT } from "../constants";

interface Star {
  id: number;
  x: string;
  y: string;
  size: string;
  opacity: number;
  animationDelay: string;
  animationDuration: string;
}

const AnimatedBackground: React.FC = () => {
  const numStars = 50;

  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: numStars }).map((_, i) => ({
      id: i,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      opacity: Math.random() * 0.5 + 0.5,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${Math.random() * 5 + 5}s`,
    }));
  }, []);

  // Simple galaxies (static or very slow moving)
  const galaxies = useMemo(
    () => [
      {
        id: "g1",
        x: "20%",
        y: "15%",
        size: "100px",
        opacity: 0.3,
        color: "rgba(123, 104, 238, 0.3)",
      }, // Lavender
      {
        id: "g2",
        x: "70%",
        y: "30%",
        size: "120px",
        opacity: 0.2,
        color: "rgba(72, 61, 139, 0.3)",
      }, // DarkSlateBlue
      {
        id: "g3",
        x: "50%",
        y: "70%",
        size: "80px",
        opacity: 0.25,
        color: "rgba(147, 112, 219, 0.3)",
      }, // MediumPurple
    ],
    []
  );

  return (
    <div
      className="absolute inset-0 overflow-hidden bg-no-repeat bg-center bg-cover"
      style={{
        width: GAME_WIDTH,
        height: GAME_HEIGHT,
        backgroundImage: "url('./img/Background_1.png')",
      }}
    ></div>
  );
};

export default AnimatedBackground;
