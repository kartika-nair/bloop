import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { motion } from "motion/react";
import { useGame } from "../context/GameContext";
import { Timer, Camera, QrCode, X } from "lucide-react";
import { Window } from "../components/Window";
import landscapeImage from "figma:asset/384a151aed4deaf8055ac825db6f26fac1568d99.png";
import mushroomIcon from "figma:asset/44cb14f30ec19ccce87828b8151a6de66f2fd5a6.png";

export function LevelPlay() {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const { levels, completeLevel } = useGame();
  const [stage, setStage] = useState<
    "intro" | "active" | "complete"
  >("intro");
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  const level = levels.find((l) => l.id === Number(levelId));

  useEffect(() => {
    if (stage === "active") {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [stage]);

  if (!level) {
    return <div>Level not found</div>;
  }

  const handleComplete = () => {
    setStage("complete");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 pixel-cursor scanlines"
      style={{
        backgroundImage: `url(${landscapeImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#87CEEB",
      }}
    >
      <div className="min-h-screen pixel-landscape-overlay flex items-center justify-center w-full">
        {stage === "intro" && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.4 }}
            className="max-w-lg w-full"
          >
            <Window
              title={`LEVEL_${level.id}.EXE`}
              showControls={true}
              onClose={() => navigate("/levels")}
              icon={
                <div className="w-3 h-3 bg-pink-500 border border-black" />
              }
            >
              <div className="win95-inset bg-white p-6">
                {/* Level Icon */}
                <div className="text-center mb-6">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="inline-block"
                  >
                    <img
                      src={mushroomIcon}
                      alt="Bloop"
                      className="w-24 h-24 mx-auto mb-4"
                      style={{ imageRendering: "pixelated" }}
                    />
                  </motion.div>

                  <h1 className="pixel-text text-2xl pixel-text-rainbow mb-2">
                    LEVEL {level.id}
                  </h1>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    {level.name}
                  </h2>
                </div>

                {/* Quest Description */}
                <div className="win95-inset p-4 bg-gray-50 mb-4">
                  <div className="flex items-start gap-2">
                    <span className="text-2xl">
                      {level.id === 1 && "👋"}
                      {level.id === 2 && "💬"}
                      {level.id === 3 && "🦋"}
                      {level.id === 4 && "🎉"}
                      {level.id === 5 && "🤝"}
                    </span>
                    <div>
                      <p className="pixel-text-sm mb-2 text-gray-700">
                        QUEST:
                      </p>
                      <p className="text-sm font-bold text-gray-900">
                        {level.quest}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Reward Box */}
                <div className="win95-inset p-4 bg-yellow-100 border-2 border-yellow-600 mb-6">
                  <p className="pixel-text-sm text-center text-gray-800 mb-2">
                    QUEST REWARD
                  </p>
                  <p className="pixel-text text-xl text-center text-yellow-800 mb-2">
                    +{level.reward} POINTS
                  </p>
                  <div className="flex gap-3 justify-center text-xs font-bold text-gray-700">
                    <span>✨ Streak Bonus</span>
                    <span>💚 +20 Health</span>
                  </div>
                </div>

                {/* Loading Bar */}
                <div className="loading-bar h-8 mb-4">
                  <motion.div
                    className="loading-bar-fill h-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5 }}
                  >
                    {Array.from({ length: 10 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="loading-bar-segment"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.15 }}
                      />
                    ))}
                  </motion.div>
                </div>

                {/* Start Button */}
                <button
                  onClick={() => setStage("active")}
                  className="w-full win95-button py-4 bg-lime-400 hover:bg-lime-500 transition-colors"
                >
                  <span className="pixel-text-sm">
                    ▶ START QUEST
                  </span>
                </button>

                <button
                  onClick={() => navigate("/levels")}
                  className="w-full mt-2 py-2 text-gray-600 hover:text-gray-800 text-sm font-bold"
                >
                  ← Back to Map
                </button>
              </div>
            </Window>
          </motion.div>
        )}

        {stage === "active" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-lg w-full"
          >
            <Window
              title="QUEST_ACTIVE.EXE"
              showControls={true}
              icon={<Timer className="w-3 h-3" />}
            >
              <div className="win95-inset bg-white p-6">
                <div className="text-center mb-6">
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="text-7xl mb-4"
                  >
                    {level.id === 1 && "👋"}
                    {level.id === 2 && "💬"}
                    {level.id === 3 && "🦋"}
                    {level.id === 4 && "🎉"}
                    {level.id === 5 && "🤝"}
                  </motion.div>

                  <p className="font-bold text-gray-800 mb-6">
                    {level.quest}
                  </p>

                  {/* Timer Display */}
                  <div className="win95-inset p-4 bg-gray-50 mb-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Timer className="w-5 h-5 text-red-600" />
                      <p className="pixel-text text-3xl text-gray-800">
                        {formatTime(timeLeft)}
                      </p>
                    </div>
                    <div className="loading-bar h-4 mt-2">
                      <div
                        className="loading-bar-fill"
                        style={{
                          width: `${(timeLeft / 600) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-gray-600 mt-2 font-bold">
                      TIME REMAINING
                    </p>
                  </div>
                </div>

                {/* Verification Options */}
                <div className="space-y-3 mb-4">
                  <button
                    onClick={handleComplete}
                    className="w-full win95-button py-4 bg-blue-400 hover:bg-blue-500 transition-colors"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <QrCode className="w-5 h-5" />
                      <span className="pixel-text-sm text-xs">
                        SCAN QR CODE
                      </span>
                    </div>
                  </button>

                  <button
                    onClick={handleComplete}
                    className="w-full win95-button py-4 bg-purple-400 hover:bg-purple-500 transition-colors"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Camera className="w-5 h-5" />
                      <span className="pixel-text-sm text-xs">
                        UPLOAD PHOTO
                      </span>
                    </div>
                  </button>
                </div>

                {/* Info Message */}
                <div className="pixel-dialog p-3 mb-4">
                  <div className="win95-title-bar active mb-2">
                    <span className="win95-title-text text-[8px]">
                      INFO
                    </span>
                  </div>
                  <div className="bg-white p-2">
                    <p className="text-xs font-bold text-gray-700 text-center">
                      ✨ Complete this quest to unlock screen
                      time! ✨
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/levels")}
                  className="w-full py-2 text-gray-600 hover:text-gray-800 text-sm font-bold"
                >
                  ← Cancel Quest
                </button>
              </div>
            </Window>
          </motion.div>
        )}

        {stage === "complete" && (
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="max-w-md w-full"
          >
            <Window
              title="IMAGE_REVIEW.EXE"
              icon={
                <div className="w-3 h-3 bg-cyan-400 border border-black" />
              }
            >
              <div className="win95-inset bg-white p-6 text-center">
                <motion.h1
                  className="pixel-text text-xl mb-6"
                  animate={{ opacity: [1, 0.6, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                >
                  QUEST COMPLETE
                </motion.h1>

                <div className="win95-inset p-4 bg-gray-50 text-left space-y-3 font-bold text-sm">
                  <p>
                    Reality Authenticity:{" "}
                    <span className="text-green-600">82%</span>
                  </p>

                  <p>
                    Environmental Diversity:{" "}
                    <span className="text-blue-600">+12%</span>
                  </p>

                  <p>
                    Novelty Index:{" "}
                    <span className="text-purple-600">
                      HIGH
                    </span>
                  </p>
                </div>

                {/* 
                  <div className="win95-inset bg-white p-6 text-center">
                    <motion.div
                      animate={{ x: [-5, 5, -5] }}
                      transition={{ duration: 0.4, repeat: Infinity }}
                      className="text-red-600 font-bold text-lg"
                    >
                      This feels familiar.
                    </motion.div>

                    <p className="mt-4 font-bold text-gray-700">
                      Show me something I haven't seen.
                    </p>

                  </div>
                */}

                <motion.button
                  onClick={() => {
                    completeLevel(level.id);
                    navigate("/level-up");
                  }}
                  className="w-full mt-6 win95-button py-3 bg-lime-400 hover:bg-lime-500 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="pixel-text-sm">
                    ▶ CONTINUE
                  </span>
                </motion.button>

                <motion.div
                  className="text-4xl mt-6"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                  }}
                >
                  ✨
                </motion.div>
              </div>
            </Window>
          </motion.div>
        )}
      </div>
    </div>
  );
}