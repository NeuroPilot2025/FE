import React, { useMemo } from "react";
import { GAME_WIDTH, GAME_HEIGHT } from "../constants";

const StartBackground: React.FC = () => {
  return (
    <>
      {/* 1. 컴포넌트 내부에 keyframes 정의 */}
      <style>{`
        @keyframes fadeOut {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0; }
        }
        @keyframes fadeIn {
          0%, 100% { opacity: 0; }
          50%      { opacity: 1; }
        }
      `}</style>

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
      >
        {/* 2. 첫 번째 배경 (이미지1) */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('./img/Background_1.png')",
            animation: "fadeOut 5s ease-in-out infinite",
          }}
        />

        {/* 3. 두 번째 배경 (이미지2) */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('./img/Background_2.png')",
            animation: "fadeIn 5s ease-in-out infinite",
          }}
        />
      </div>
    </>
  );
};

export default StartBackground;
