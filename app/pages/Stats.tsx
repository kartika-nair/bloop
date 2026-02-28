import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { useGame } from "../context/GameContext";
import {
  Home as HomeIcon,
  BarChart3,
  Map,
  TrendingUp,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Window } from "../components/Window";
import landscapeImage from "figma:asset/81de6ab628f9348062a945eedacb5843bcf7f478.png";
import { useState, useEffect } from "react";

export function Stats() {
  const navigate = useNavigate();
  const { streak, totalPoints, health, levels } = useGame();

  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now
        .getMinutes()
        .toString()
        .padStart(2, "0");

      setCurrentTime(`${hours}:${minutes}`);
    };

    updateTime(); // set immediately on mount
    const interval = setInterval(updateTime, 60000); // update every minute

    return () => clearInterval(interval); // cleanup
  }, []);

  const weeklyData = [
    { day: "Mon", minutes: 45 },
    { day: "Tue", minutes: 30 },
    { day: "Wed", minutes: 60 },
    { day: "Thu", minutes: 25 },
    { day: "Fri", minutes: 50 },
    { day: "Sat", minutes: 40 },
    { day: "Sun", minutes: 35 },
  ];

  const topApps = [
    {
      name: "YouTube",
      time: 120,
      color: "#ff4757",
      emoji: "📺",
    },
    {
      name: "Instagram",
      time: 90,
      color: "#ff1493",
      emoji: "📸",
    },
    { name: "TikTok", time: 75, color: "#9b59b6", emoji: "🎵" },
    {
      name: "Twitter",
      time: 45,
      color: "#00d4ff",
      emoji: "🐦",
    },
  ];

  const completedLevels = levels.filter(
    (l) => l.completed,
  ).length;
  const totalLevels = levels.length;

  return (
    <div
      className="min-h-screen pixel-cursor scanlines"
      style={{
        backgroundImage: `url(${landscapeImage})`,
        backgroundColor: "#87CEEB",
      }}
    >
      <div className="min-h-screen pixel-landscape-overlay">
        <div className="max-w-5xl mx-auto p-4 pb-24">
          {/* Header */}
          <motion.div
            className="text-center mb-6 pt-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <h1 className="pixel-text text-3xl pixel-text-rainbow mb-2">
              YOUR STATS
            </h1>
            <p className="pixel-text-sm text-white drop-shadow-lg">
              Track your progress!
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {/* Key Stats Window */}
            <Window
              title="STATISTICS.EXE"
              showControls={true}
              icon={<TrendingUp className="w-3 h-3" />}
            >
              <div className="grid grid-cols-2 gap-2">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="win95-inset p-3 bg-white text-center"
                >
                  <div className="text-4xl mb-2">🔥</div>
                  <p className="pixel-text-sm text-xs text-gray-700 mb-1">
                    STREAK
                  </p>
                  <p
                    className="pixel-text text-xl"
                    style={{ color: "#ff6b35" }}
                  >
                    {streak}
                  </p>
                  <p className="text-xs text-gray-600">days</p>
                </motion.div>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="win95-inset p-3 bg-white text-center"
                >
                  <div className="text-4xl mb-2">⭐</div>
                  <p className="pixel-text-sm text-xs text-gray-700 mb-1">
                    POINTS
                  </p>
                  <p
                    className="pixel-text text-xl"
                    style={{ color: "#ffd700" }}
                  >
                    {totalPoints}
                  </p>
                  <p className="text-xs text-gray-600">total</p>
                </motion.div>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="win95-inset p-3 bg-white text-center"
                >
                  <div className="text-4xl mb-2">💚</div>
                  <p className="pixel-text-sm text-xs text-gray-700 mb-1">
                    HEALTH
                  </p>
                  <p
                    className="pixel-text text-xl"
                    style={{ color: "#32cd32" }}
                  >
                    {health}
                  </p>
                  <p className="text-xs text-gray-600">
                    percent
                  </p>
                </motion.div>

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="win95-inset p-3 bg-white text-center"
                >
                  <div className="text-4xl mb-2">🏆</div>
                  <p className="pixel-text-sm text-xs text-gray-700 mb-1">
                    COMPLETE
                  </p>
                  <p
                    className="pixel-text text-xl"
                    style={{ color: "#9b59b6" }}
                  >
                    {completedLevels}/{totalLevels}
                  </p>
                  <p className="text-xs text-gray-600">
                    levels
                  </p>
                </motion.div>
              </div>
            </Window>

            {/* Weekly Chart Window */}
            <Window
              title="WEEKLY_CHART.EXE"
              icon={<BarChart3 className="w-3 h-3" />}
            >
              <div className="win95-inset p-4 bg-white">
                <p className="pixel-text-sm mb-3 text-gray-800">
                  SCREEN TIME (MIN)
                </p>
                <ResponsiveContainer width="100%" height={150}>
                  <BarChart data={weeklyData}>
                    <XAxis
                      dataKey="day"
                      tick={{
                        fill: "#333",
                        fontSize: 10,
                        fontFamily: "monospace",
                      }}
                      axisLine={{ stroke: "#999" }}
                    />
                    <YAxis
                      tick={{
                        fill: "#333",
                        fontSize: 10,
                        fontFamily: "monospace",
                      }}
                      axisLine={{ stroke: "#999" }}
                    />
                    <Bar
                      dataKey="minutes"
                      radius={[4, 4, 0, 0]}
                    >
                      {weeklyData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            index === weeklyData.length - 1
                              ? "#ff1493"
                              : "#9b59b6"
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <div className="win95-status-bar mt-2">
                  <span className="pixel-text-sm text-[9px] text-gray-700">
                    AVG: 41 MIN/DAY
                  </span>
                </div>
              </div>
            </Window>
          </div>

          {/* Apps Window */}
          <Window
            title="TOP_APPS.EXE"
            className="mb-4"
            icon={<span className="text-xs">📱</span>}
          >
            <div className="win95-inset p-4 bg-white">
              <p className="pixel-text-sm mb-3 text-gray-800">
                TIME DRAINS THIS WEEK
              </p>
              <div className="space-y-3">
                {topApps.map((app, index) => (
                  <motion.div
                    key={app.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="win95-inset p-3 bg-gray-50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">
                          {app.emoji}
                        </span>
                        <span className="font-bold text-gray-800 text-sm">
                          {app.name}
                        </span>
                      </div>
                      <span className="pixel-text-sm text-xs text-gray-700">
                        {app.time}m
                      </span>
                    </div>
                    <div className="loading-bar h-4">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(app.time / 120) * 100}%`,
                        }}
                        transition={{
                          delay: 0.6 + index * 0.1,
                          duration: 0.5,
                        }}
                        className="h-full"
                        style={{
                          backgroundColor: app.color,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {Array.from({
                          length: Math.floor(
                            (app.time / 120) * 10,
                          ),
                        }).map((_, i) => (
                          <div
                            key={i}
                            className="loading-bar-segment"
                          />
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Window>

          {/* Quest History Window */}
          <Window
            title="QUEST_HISTORY.EXE"
            icon={<span className="text-xs">📜</span>}
          >
            <div className="win95-inset p-4 bg-white max-h-64 overflow-y-auto">
              <p className="pixel-text-sm mb-3 text-gray-800">
                COMPLETED QUESTS
              </p>
              <div className="space-y-2">
                {levels
                  .filter((l) => l.completed)
                  .map((level, index) => (
                    <motion.div
                      key={level.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="flex items-center justify-between win95-inset p-3 bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-6 h-6 flex items-center justify-center text-sm"
                          style={{
                            backgroundColor: "#32cd32",
                            border: "1px solid #000",
                            color: "#fff",
                            fontWeight: "bold",
                          }}
                        >
                          ✓
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 text-xs">
                            LVL {level.id}: {level.name}
                          </p>
                          <p className="text-[10px] text-gray-600">
                            {level.quest}
                          </p>
                        </div>
                      </div>
                      <span
                        className="pixel-text-sm text-xs"
                        style={{ color: "#ffd700" }}
                      >
                        +{level.reward}
                      </span>
                    </motion.div>
                  ))}
                {completedLevels === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500 text-sm mb-2">
                      ⚠️
                    </p>
                    <p className="text-xs text-gray-600 font-bold">
                      No quests completed yet.
                      <br />
                      Start your journey!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Window>
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
              <button
                onClick={() => navigate("/home")}
                className="win95-button px-4 py-1"
              >
                <HomeIcon className="w-3 h-3 inline mr-1" />
                <span className="pixel-text-sm text-xs">
                  HOME
                </span>
              </button>
              <button className="win95-button px-4 py-1 bg-white">
                <BarChart3 className="w-3 h-3 inline mr-1" />
                <span className="pixel-text-sm text-xs">
                  STATS
                </span>
              </button>
              <button
                onClick={() => navigate("/levels")}
                className="win95-button px-4 py-1"
              >
                <Map className="w-3 h-3 inline mr-1" />
                <span className="pixel-text-sm text-xs">
                  MAP
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