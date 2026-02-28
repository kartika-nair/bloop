import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { useGame } from "../context/GameContext";
import {
  Lock,
  Check,
  Star,
  MapPin,
  Trophy,
  Flower2,
  Trees,
} from "lucide-react";
import { Window } from "../components/Window";
import roadMapBg from "figma:asset/c5e5310c71a6486f5afd67ba63cc46a3c8bd5283.png";
import mushroomIcon from "figma:asset/44cb14f30ec19ccce87828b8151a6de66f2fd5a6.png";
import { useState, useEffect } from "react";

export function LevelMap() {
  const navigate = useNavigate();
  const { levels, currentLevel } = useGame();

  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");

      setCurrentTime(`${hours}:${minutes}`);
    };

    updateTime(); // set immediately on mount
    const interval = setInterval(updateTime, 60000); // update every minute

    return () => clearInterval(interval); // cleanup
  }, []);

  const getLevelColor = (levelId: number) => {
    const colors = [
      "#ff1493", // pink
      "#ffd700", // yellow
      "#32cd32", // green
      "#9b59b6", // purple
      "#ff6b35", // orange
    ];
    return colors[(levelId - 1) % colors.length];
  };

  return (
    <div
      className="min-h-screen pixel-cursor scanlines relative"
      style={{
        backgroundColor: "#87CEEB",
      }}
    >
      <div className="min-h-screen">
        <div className="max-w-5xl mx-auto p-4 pb-24">
          {/* Header with colorful title */}
          <motion.div
            className="text-center mb-6 pt-4"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <motion.h1
              className="pixel-text text-4xl mb-2 pixel-text-outlined"
              style={{
                background:
                  "linear-gradient(45deg, #ff1493, #ffd700, #32cd32, #00d4ff, #9b59b6)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter:
                  "drop-shadow(3px 3px 0 rgba(0,0,0,0.5))",
              }}
              animate={{
                backgroundPosition: [
                  "0% 50%",
                  "100% 50%",
                  "0% 50%",
                ],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              ROAD MAP
            </motion.h1>
            <p className="pixel-text-sm text-white drop-shadow-lg">
              Choose your level!
            </p>
          </motion.div>

          {/* Main Map Window */}
          <Window
            title="LEVEL_MAP.EXE"
            showControls={true}
            icon={<MapPin className="w-3 h-3" />}
            className="mb-4"
          >
            <div
              className="win95-inset relative overflow-hidden"
              style={{
                backgroundImage: `url(${roadMapBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                imageRendering: "pixelated",
                minHeight: "600px",
              }}
            >
              {/* Decorative elements */}
              <motion.div
                className="absolute bottom-4 left-4 text-6xl"
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🌲
              </motion.div>
              <motion.div
                className="absolute bottom-4 right-4 text-6xl"
                animate={{
                  rotate: [0, -5, 5, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  delay: 0.5,
                }}
              >
                🌲
              </motion.div>
              <motion.div
                className="absolute top-4 right-8 text-5xl"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🏆
              </motion.div>

              {/* Winding path with levels */}
              <div className="relative p-8">
                {levels.map((level, index) => {
                  const isEven = index % 2 === 0;
                  const yPos = 50 + index * 110;
                  const xPos = isEven ? "15%" : "70%";

                  return (
                    <div key={level.id}>
                      {/* Connecting path to next level */}
                      {index < levels.length - 1 && (
                        <motion.div
                          className="absolute"
                          style={{
                            left: isEven ? "22%" : "77%",
                            top: yPos + 40,
                            width: "55%",
                            height: "100px",
                          }}
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: level.unlocked ? 1 : 0.3,
                          }}
                          transition={{ delay: index * 0.2 }}
                        >
                          <svg
                            width="100%"
                            height="100%"
                            style={{ overflow: "visible" }}
                          >
                            <motion.path
                              d={`M 0 0 Q ${isEven ? "50%" : "-50%"} 50 ${isEven ? "100%" : "-100%"} 100`}
                              stroke="#555"
                              strokeWidth="8"
                              fill="none"
                              strokeDasharray="10 5"
                              strokeLinecap="round"
                              initial={{ pathLength: 0 }}
                              animate={{
                                pathLength: level.unlocked
                                  ? 1
                                  : 0,
                              }}
                              transition={{
                                duration: 1,
                                delay: index * 0.2,
                              }}
                            />
                          </svg>
                        </motion.div>
                      )}

                      {/* Level node */}
                      <motion.div
                        className="absolute"
                        style={{
                          left: xPos,
                          top: yPos,
                          transform: "translate(-50%, -50%)",
                        }}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          delay: index * 0.2,
                          type: "spring",
                          bounce: 0.6,
                        }}
                      >
                        {/* START label for first level */}
                        {index === 0 && (
                          <motion.div
                            className="absolute -bottom-16 left-1/2 -translate-x-1/2 win95-button px-4 py-2 bg-lime-400"
                            animate={{
                              scale: [1, 1.05, 1],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                            }}
                          >
                            <span className="pixel-text-sm text-green-800">
                              START
                            </span>
                          </motion.div>
                        )}

                        {/* Level button with location pin style */}
                        <motion.button
                          onClick={() =>
                            level.unlocked &&
                            navigate(`/level/${level.id}`)
                          }
                          disabled={!level.unlocked}
                          className="relative flex flex-col items-center"
                          whileHover={
                            level.unlocked ? { scale: 1.1 } : {}
                          }
                          whileTap={
                            level.unlocked
                              ? { scale: 0.95 }
                              : {}
                          }
                        >
                          {/* Location pin */}
                          <motion.div
                            className="relative"
                            animate={
                              currentLevel === level.id &&
                              level.unlocked
                                ? {
                                    y: [0, -10, 0],
                                    filter: [
                                      "drop-shadow(0 0 8px rgba(255,255,255,0.8))",
                                      "drop-shadow(0 0 16px rgba(255,255,255,1))",
                                      "drop-shadow(0 0 8px rgba(255,255,255,0.8))",
                                    ],
                                  }
                                : {}
                            }
                            transition={{
                              duration: 1.5,
                              repeat:
                                currentLevel === level.id
                                  ? Infinity
                                  : 0,
                            }}
                          >
                            <MapPin
                              className="w-16 h-16"
                              fill={
                                level.unlocked
                                  ? getLevelColor(level.id)
                                  : "#999"
                              }
                              color={
                                level.unlocked ? "#000" : "#666"
                              }
                              strokeWidth={2}
                            />

                            {/* Level number or icon */}
                            <div className="absolute top-3 left-1/2 -translate-x-1/2">
                              {level.completed ? (
                                <Check
                                  className="w-6 h-6 text-white"
                                  strokeWidth={4}
                                />
                              ) : level.unlocked ? (
                                <span className="pixel-text text-sm text-white">
                                  {level.id}
                                </span>
                              ) : (
                                <Lock className="w-5 h-5 text-white/70" />
                              )}
                            </div>
                          </motion.div>

                          {/* Level name card */}
                          <motion.div
                            className="mt-2 win95-window p-2 min-w-[160px]"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              delay: index * 0.2 + 0.3,
                            }}
                          >
                            <div className="win95-title-bar active mb-1">
                              <span className="win95-title-text text-[8px]">
                                LVL {level.id}
                              </span>
                            </div>
                            <div className="bg-white p-2">
                              <p className="pixel-text-sm text-xs text-center text-gray-800 mb-1">
                                {level.name}
                              </p>
                              {level.unlocked && (
                                <p className="text-[9px] text-center text-gray-600 font-bold">
                                  Reward: +{level.reward} pts
                                </p>
                              )}
                            </div>
                          </motion.div>

                          {/* Star for completed levels */}
                          {level.completed && (
                            <motion.div
                              className="absolute -top-2 -right-2"
                              animate={{ rotate: [0, 360] }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            >
                              <Star
                                className="w-8 h-8 fill-yellow-300 text-yellow-500"
                                strokeWidth={2}
                              />
                            </motion.div>
                          )}
                        </motion.button>

                        {/* Decorative flowers around current level */}
                        {currentLevel === level.id &&
                          level.unlocked && (
                            <>
                              <motion.div
                                className="absolute -left-12 top-0 text-3xl"
                                animate={{ rotate: [0, 360] }}
                                transition={{
                                  duration: 8,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                              >
                                🌻
                              </motion.div>
                              <motion.div
                                className="absolute -right-12 bottom-0 text-3xl"
                                animate={{ rotate: [360, 0] }}
                                transition={{
                                  duration: 8,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                              >
                                🌸
                              </motion.div>
                            </>
                          )}

                        {/* Mushroom character near current level */}
                        {currentLevel === level.id &&
                          level.unlocked && (
                            <motion.div
                              className="absolute -left-20 top-8"
                              animate={{
                                x: [0, 10, 0],
                                y: [0, -5, 0],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                              }}
                            >
                              <img
                                src={mushroomIcon}
                                alt="Bloop"
                                className="w-12 h-12"
                                style={{
                                  imageRendering: "pixelated",
                                }}
                              />
                            </motion.div>
                          )}
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Window>

          {/* Back button */}
          <button
            onClick={() => navigate("/home")}
            className="win95-button px-6 py-3 hover:bg-gray-200 transition-colors"
          >
            <span className="pixel-text-sm">
              ← BACK TO HOME
            </span>
          </button>
        </div>

        {/* Win95 Taskbar */}
        <div className="fixed bottom-0 left-0 right-0 bg-[var(--win95-gray)] border-t-2 border-white shadow-lg">
          <div className="max-w-5xl mx-auto flex items-center justify-between p-1">
            <button
              onClick={() => navigate("/")}
              className="win95-button px-3 py-1 flex items-center gap-2"
            >
              <div className="w-4 h-4 bg-red-500 border border-black" />
              <span className="pixel-text-sm">START</span>
            </button>

            <div className="flex gap-1">
              <button className="win95-button px-4 py-1 bg-white">
                <MapPin className="w-3 h-3 inline mr-1" />
                <span className="pixel-text-sm text-xs">
                  LEVEL MAP
                </span>
              </button>
            </div>

            <div className="win95-inset px-3 py-1 bg-white">
              <span className="pixel-text-sm text-xs">
                {currentTime}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}