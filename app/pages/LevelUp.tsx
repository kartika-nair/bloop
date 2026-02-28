import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { useGame } from "../context/GameContext";
import { Bloop } from "../components/Bloop";
import { Sparkles } from "lucide-react";
import { Window } from "../components/Window";

export function LevelUp() {
  const navigate = useNavigate();
  const { currentLevel, levels } = useGame();
  
  const levelData = levels.find((l) => l.id === currentLevel - 1);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pixel-cursor scanlines bg-[#008080]">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", bounce: 0.5, duration: 1 }}
        className="max-w-md w-full"
      >
        <Window
          title="LEVEL_UP.EXE"
          icon={<Sparkles className="w-3 h-3" />}
        >
          <div className="win95-inset bg-white p-6 text-center">

            {/* Animated Icon */}
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-4"
            >
              ✨
            </motion.div>

            <h1 className="pixel-text text-2xl pixel-text-rainbow mb-4">
              LEVEL UP!
            </h1>

            {/* Bloop Evolution */}
            <motion.div
              animate={{ 
                y: [0, -8, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-6"
            >
              <div className="win95-inset p-6 bg-gray-100 inline-block">
                <Bloop state="evolved" level={currentLevel} animate={true} />
              </div>
            </motion.div>

            {/* Level Info */}
            <div className="win95-inset p-4 bg-gray-50 mb-4">
              <p className="pixel-text text-lg text-gray-800">
                LEVEL {currentLevel - 1}
              </p>
              <p className="font-bold text-gray-900">
                {levelData?.name}
              </p>
            </div>

            {/* Reward Box */}
            <div className="win95-inset p-4 bg-yellow-100 border-2 border-yellow-600 mb-4">
              <p className="pixel-text text-xl text-yellow-800">
                +{levelData?.reward} HP
              </p>
              <div className="flex justify-center gap-4 text-xs font-bold text-gray-700 mt-2">
                <span>💚 +20 Health</span>
                <span>🔥 +1 Streak</span>
              </div>
            </div>

            {/* Continue Button */}
            <button
              onClick={() => navigate("/home")}
              className="w-full win95-button py-4 bg-lime-400 hover:bg-lime-500 transition-colors"
            >
              <span className="pixel-text-sm">▶ CONTINUE</span>
            </button>
          </div>
        </Window>
      </motion.div>
    </div>
  );
}