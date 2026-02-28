import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Bloop } from "../components/Bloop";
import { useGame } from "../context/GameContext";
import { Home as HomeIcon, BarChart3, Map, Zap, Heart, Clock } from "lucide-react";
import { Window } from "../components/Window";
import landscapeImage from "figma:asset/81de6ab628f9348062a945eedacb5843bcf7f478.png";
import mushroomIcon from "figma:asset/44cb14f30ec19ccce87828b8151a6de66f2fd5a6.png";
import { useState, useEffect } from "react";

export function Home() {
  const navigate = useNavigate();
  const { currentLevel, totalPoints, streak, health, screenTimeToday, levels } = useGame();

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
  
  const currentLevelData = levels.find((l) => l.id === currentLevel);
  const bloopState = health > 70 ? "healthy" : health > 30 ? "weak" : "critical";

  return (
    <div 
      className="min-h-screen pixel-landscape-bg pixel-cursor scanlines"
      style={{ 
        backgroundImage: `url(${landscapeImage})`,
        backgroundColor: '#87CEEB'
      }}
    >
      <div className="min-h-screen pixel-landscape-overlay">
        <div className="max-w-4xl mx-auto p-4 pb-24">
          {/* Desktop-style top bar */}
          <div className="mb-4 flex items-center gap-2">
            <motion.div
              className="desktop-icon"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-12 h-12">
                <img 
                  src={mushroomIcon} 
                  alt="Bloop" 
                  className="w-full h-full object-contain"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
              <span className="desktop-icon-label">BLOOP.EXE</span>
            </motion.div>
          </div>

          {/* Main Dashboard Window */}
          <Window 
            title="BLOOP DASHBOARD.EXE" 
            showControls={true}
            icon={<div className="w-4 h-4 bg-pink-500 border border-black" />}
            className="mb-4"
          >
            <div className="win95-inset p-4 bg-white">
              {/* Level Header */}
              <div className="text-center mb-6">
                <motion.h1 
                  className="pixel-text text-2xl pixel-text-rainbow mb-2"
                  animate={{ 
                    scale: [1, 1.02, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {currentLevelData?.name || "Shy Sprout"}
                </motion.h1>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="pixel-text-sm text-gray-700">LEVEL {currentLevel}</span>
                  <span className="text-yellow-500">⭐</span>
                  <span className="pixel-text-sm text-gray-700">{totalPoints} POINTS</span>
                  <span className="text-orange-500">🔥</span>
                  <span className="pixel-text-sm text-gray-700">{streak} STREAK</span>
                </div>
              </div>

              {/* Character Display */}
              <div className="flex justify-center items-center gap-8 mb-6">
                {/* Mushroom Character */}
                <motion.div
                  className="relative"
                  animate={{ 
                    y: bloopState === "critical" ? [0, 8, 0] : [0, -12, 0]
                  }}
                  transition={{ 
                    duration: bloopState === "critical" ? 0.8 : 2.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="relative w-32 h-32">
                    <img 
                      src={mushroomIcon}
                      alt="Bloop"
                      className="w-full h-full object-contain"
                      style={{ 
                        imageRendering: 'pixelated',
                        filter: health < 30 ? 'grayscale(70%)' : health < 70 ? 'grayscale(30%)' : 'none'
                      }}
                    />
                    {health > 70 && (
                      <>
                        <motion.div
                          className="absolute -top-2 -right-2 text-2xl"
                          animate={{ 
                            rotate: [0, 15, -15, 0],
                            scale: [1, 1.2, 1]
                          }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          ✨
                        </motion.div>
                        <motion.div
                          className="absolute -bottom-1 -left-2 text-xl"
                          animate={{ 
                            rotate: [0, -15, 15, 0],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ duration: 1.8, repeat: Infinity }}
                        >
                          💫
                        </motion.div>
                      </>
                    )}
                    {health <= 30 && (
                      <motion.div
                        className="absolute -top-4 left-1/2 -translate-x-1/2"
                        animate={{ y: [-5, 5, -5] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <span className="pixel-text-sm text-red-600">⚠️</span>
                      </motion.div>
                    )}
                  </div>
                  
                  {/* Health bar under mushroom */}
                  <div className="mt-2">
                    <div className="loading-bar h-6">
                      <div 
                        className="loading-bar-fill"
                        style={{ width: `${health}%` }}
                      >
                        {Array.from({ length: Math.floor(health / 10) }).map((_, i) => (
                          <div key={i} className="loading-bar-segment" />
                        ))}
                      </div>
                    </div>
                    <p className="pixel-text-sm text-center mt-1 text-gray-700">
                      HEALTH: {health}%
                    </p>
                  </div>
                </motion.div>

                {/* Status Info Panel */}
                <div className="flex-1 space-y-3">
                  <div className="win95-inset p-3 bg-gray-50">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span className="pixel-text-sm">HEALTH STATUS</span>
                    </div>
                    <p className="text-xs font-bold text-gray-700">
                      {health > 70 && "💚 EXCELLENT! Bloop is thriving!"}
                      {health > 30 && health <= 70 && "💛 GOOD! Keep it up!"}
                      {health <= 30 && "❤️ CRITICAL! Bloop needs help!"}
                    </p>
                  </div>

                  <div className="win95-inset p-3 bg-gray-50">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span className="pixel-text-sm">SCREEN TIME</span>
                    </div>
                    <p className="text-xs font-bold text-gray-700">
                      {screenTimeToday} minutes today
                    </p>
                  </div>

                  <div className="win95-inset p-3 bg-gray-50">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      <span className="pixel-text-sm">NEXT QUEST</span>
                    </div>
                    <p className="text-xs font-bold text-gray-700">
                      {currentLevelData ? `Level ${currentLevel}` : "Start your journey!"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={() => navigate("/levels")}
                  className="w-full win95-button py-4 hover:bg-gray-200 transition-colors"
                >
                  <span className="pixel-text-sm">▶ START QUEST</span>
                </button>
                
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => navigate("/stats")}
                    className="win95-button py-2 hover:bg-gray-200 transition-colors"
                  >
                    <span className="pixel-text-sm text-xs">STATS</span>
                  </button>
                  <button
                    onClick={() => navigate("/levels")}
                    className="win95-button py-2 hover:bg-gray-200 transition-colors"
                  >
                    <span className="pixel-text-sm text-xs">MAP</span>
                  </button>
                  <button
                    onClick={() => navigate("/emergency")}
                    className="win95-button py-2 hover:bg-gray-200 transition-colors text-red-600"
                  >
                    <span className="pixel-text-sm text-xs">HELP</span>
                  </button>
                </div>
              </div>
            </div>
          </Window>

          {/* Quick Stats Window */}
          <Window 
            title="QUICK STATS.EXE"
            icon={<BarChart3 className="w-3 h-3" />}
          >
            <div className="grid grid-cols-3 gap-2">
              <div className="win95-inset p-3 bg-white text-center">
                <div className="text-3xl mb-1">💚</div>
                <div className="pixel-text-sm text-xs text-gray-700 mb-1">HEALTH</div>
                <div className="font-bold text-lg" style={{ color: health > 70 ? '#32cd32' : health > 30 ? '#ffd700' : '#ff4757' }}>
                  {health}%
                </div>
              </div>
              
              <div className="win95-inset p-3 bg-white text-center">
                <div className="text-3xl mb-1">⏱️</div>
                <div className="pixel-text-sm text-xs text-gray-700 mb-1">TODAY</div>
                <div className="font-bold text-lg text-blue-600">
                  {screenTimeToday}m
                </div>
              </div>
              
              <div className="win95-inset p-3 bg-white text-center">
                <div className="text-3xl mb-1">⭐</div>
                <div className="pixel-text-sm text-xs text-gray-700 mb-1">POINTS</div>
                <div className="font-bold text-lg text-yellow-600">
                  {totalPoints}
                </div>
              </div>
            </div>
          </Window>
        </div>

        {/* Win95 Taskbar */}
        <div className="fixed bottom-0 left-0 right-0 bg-[var(--win95-gray)] border-t-2 border-white shadow-lg">
          <div className="max-w-4xl mx-auto flex items-center justify-between p-1">
            <button
              onClick={() => navigate("/")}
              className="win95-button px-3 py-1 flex items-center gap-2"
            >
              <div className="w-4 h-4 bg-red-500 border border-black" />
              <span className="pixel-text-sm">START</span>
            </button>
            
            <div className="flex gap-1 flex-1 mx-2">
              <button 
                onClick={() => navigate("/home")}
                className="win95-button px-4 py-1 flex-1 max-w-[150px] bg-white"
              >
                <HomeIcon className="w-3 h-3 inline mr-1" />
                <span className="pixel-text-sm text-xs">HOME</span>
              </button>
              <button 
                onClick={() => navigate("/stats")}
                className="win95-button px-4 py-1 flex-1 max-w-[150px]"
              >
                <BarChart3 className="w-3 h-3 inline mr-1" />
                <span className="pixel-text-sm text-xs">STATS</span>
              </button>
              <button 
                onClick={() => navigate("/levels")}
                className="win95-button px-4 py-1 flex-1 max-w-[150px]"
              >
                <Map className="w-3 h-3 inline mr-1" />
                <span className="pixel-text-sm text-xs">LEVELS</span>
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