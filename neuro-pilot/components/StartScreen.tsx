import React, { useState } from "react";
import AnimatedBackground from "./AnimatedBackground";
import { SelectedBunny } from "../types";
// Note: BUNNY_SVG_DATA constants are not used here anymore for display,
// but they are kept in constants.ts for Player.tsx

interface StartScreenProps {
  onPlay: (nickname: string, selectedBunny: SelectedBunny) => void;
  initialNickname?: string;
}

const bunnyCharacterOptions = [
  {
    type: SelectedBunny.DEFAULT,
    name: "Basic Bunny",
    imageSrc: "./img/Rabbit1.png",
  },
  {
    type: SelectedBunny.OPTION_B,
    name: "Warrior Bunny",
    imageSrc: "./img/Rabbit2.png",
  }, // Placeholder for tough bunny
  {
    type: SelectedBunny.OPTION_C,
    name: "Sweetheart Bunny",
    imageSrc: "./img/Rabbit3.png",
  }, // Placeholder for cute bunny with bow
];

const StartScreen: React.FC<StartScreenProps> = ({
  onPlay,
  initialNickname = "",
}) => {
  const [nickname, setNickname] = useState(initialNickname);
  const [currentBunnyIndex, setCurrentBunnyIndex] = useState(0);

  const selectedBunnyType = bunnyCharacterOptions[currentBunnyIndex].type;
  const currentBunnyImage = bunnyCharacterOptions[currentBunnyIndex].imageSrc;
  const currentBunnyName = bunnyCharacterOptions[currentBunnyIndex].name;

  const handlePreviousBunny = () => {
    setCurrentBunnyIndex((prevIndex) =>
      prevIndex === 0 ? bunnyCharacterOptions.length - 1 : prevIndex - 1
    );
  };

  const handleNextBunny = () => {
    setCurrentBunnyIndex((prevIndex) =>
      prevIndex === bunnyCharacterOptions.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleKeyDownOnArrow = (
    e: React.KeyboardEvent,
    action: "prev" | "next"
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (action === "prev") handlePreviousBunny();
      else handleNextBunny();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickname.trim()) {
      onPlay(nickname.trim(), selectedBunnyType);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-white relative overflow-hidden">
      <AnimatedBackground />

      <div className="relative z-10 flex flex-col items-center w-full max-w-md p-4">
        <img
          src="/img/Logo.png"
          alt="Neuro Pilot"
          className="-mt-8 mb-8 w-full h-auto pixelated"
        />

        <div className="flex items-center justify-around w-full mb-6 md:mb-8">
          <button
            onClick={handlePreviousBunny}
            onKeyDown={(e) => handleKeyDownOnArrow(e, "prev")}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Previous character"
          >
            <img
              src="./img/changeBar_left.png"
              alt="left"
              className="w-7 h-auto pixelated"
            />
          </button>

          <img
            src={currentBunnyImage}
            alt={currentBunnyName}
            className="w-[170px] h-[240px] object-contain pixelated"
            aria-live="polite"
          />

          <button
            onClick={handleNextBunny}
            onKeyDown={(e) => handleKeyDownOnArrow(e, "next")}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Next character"
          >
            <img
              src="./img/changeBar_right.png"
              alt="right"
              className="w-7 h-auto pixelated"
            />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xs flex flex-col items-center"
        >
          <label htmlFor="nickname" className="sr-only">
            닉네임을 입력해주세요 (5자 제한)
          </label>
          <input
            id="nickname"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임을 입력해주세요"
            className="w-64 px-4 py-3 mt-2 mb-6 bg-slate-800/80 border-2 border-slate-700 rounded-2xl text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none text-center text-lg"
            maxLength={5}
            aria-required="true"
          />
          <button
            type="submit"
            className="w-[200px] h-[70px] bg-transparent border-none cursor-pointer p-0 transition-transform duration-150 active:scale-95 hover:opacity-90 pixelated"
            style={{
              backgroundImage: `url('./img/StartBtn.png')`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
            aria-label="Play Game"
          >
            {/* Intentionally empty as text is part of the image */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default StartScreen;
