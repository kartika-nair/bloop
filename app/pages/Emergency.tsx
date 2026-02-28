import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Bloop } from "../components/Bloop";
import { AlertTriangle, AlertCircle } from "lucide-react";
import { Window } from "../components/Window";
import mushroomIcon from "figma:asset/44cb14f30ec19ccce87828b8151a6de66f2fd5a6.png";

export function Emergency() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-black flex items-center justify-center p-4 overflow-hidden pixel-cursor scanlines">
      {/* Pulsing danger effect */}
      <motion.div
        className="absolute inset-0 bg-red-500/20"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />

      <div className="max-w-lg w-full relative z-10">
        {/* Critical Warning Dialog */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.4 }}
        >
          <Window
            title="⚠️ SYSTEM_ALERT.EXE"
            showControls={false}
            icon={<AlertTriangle className="w-3 h-3 text-red-600" />}
            className="border-4 border-red-600 shadow-[0_0_30px_rgba(220,38,38,0.6)]"
          >
            <div className="win95-inset bg-white p-6">
              {/* Warning Banner */}
              <div className="bg-red-600 text-white p-3 mb-4 flex items-center gap-3">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  <AlertCircle className="w-6 h-6" />
                </motion.div>
                <div>
                  <p className="pixel-text text-sm">CRITICAL ALERT</p>
                  <p className="text-xs">IMMEDIATE ACTION REQUIRED</p>
                </div>
              </div>

              {/* Critical Bloop */}
              <div className="text-center mb-6">
                <motion.div
                  animate={{ 
                    y: [0, 10, 0],
                    filter: [
                      'grayscale(70%)',
                      'grayscale(90%)',
                      'grayscale(70%)'
                    ]
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="inline-block"
                >
                  <img 
                    src={mushroomIcon}
                    alt="Bloop Critical"
                    className="w-32 h-32 mx-auto"
                    style={{ 
                      imageRendering: 'pixelated',
                      filter: 'grayscale(80%) brightness(0.7)'
                    }}
                  />
                </motion.div>
                <motion.p 
                  className="pixel-text text-red-600 mt-2"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                >
                  HEALTH: 5%
                </motion.p>
              </div>

              {/* Scrolling Stats */}
              <div className="win95-inset p-4 bg-red-100 border-2 border-red-600 mb-4">
                <p className="pixel-text-sm text-center text-red-800 mb-3">
                  WARNING STATUS
                </p>
                <div className="space-y-2 text-sm font-bold text-gray-800">
                  <div className="flex justify-between">
                    <span>Screen Time:</span>
                    <span className="text-red-600">2 HRS 34 MIN</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Consecutive Scrolling:</span>
                    <span className="text-red-600">1 HR 12 MIN</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bloop Status:</span>
                    <span className="text-red-600 pixel-blink">💀 DYING</span>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="pixel-dialog p-4 mb-4">
                <div className="win95-title-bar active mb-2">
                  <span className="win95-title-text text-[8px]">MESSAGE</span>
                </div>
                <div className="bg-white p-4 text-center">
                  <motion.p 
                    className="text-xl font-bold text-gray-800 mb-2"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    IT'S TIME TO GO OUTSIDE.
                  </motion.p>
                  <p className="text-2xl font-bold text-red-600">NOW.</p>
                </div>
              </div>

              {/* Mandatory Quest */}
              <div className="win95-inset p-4 bg-yellow-100 border-2 border-yellow-600 mb-4">
                <p className="pixel-text-sm text-center text-gray-800 mb-2">
                  🔒 MANDATORY QUEST
                </p>
                <p className="text-sm font-bold text-gray-800 mb-3 text-center">
                  "Find someone wearing blue and say hello"
                </p>
                <div className="loading-bar h-6">
                  <motion.div 
                    className="h-full"
                    style={{ 
                      backgroundColor: '#ff4757',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    animate={{ opacity: [1, 0.7, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div key={i} className="loading-bar-segment" />
                    ))}
                  </motion.div>
                </div>
                <p className="text-xs text-center text-gray-700 font-bold mt-2">
                  ⚠️ Screen time is LOCKED until completion
                </p>
              </div>

              {/* Action Buttons */}
              <motion.button
                onClick={() => navigate("/levels")}
                className="w-full win95-button py-8 text-2xl bg-red-600 hover:bg-red-700 transition-colors border-4 border-black"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    "6px 6px 0 rgba(0,0,0,0.4)",
                    "6px 6px 25px rgba(255,0,0,0.8)",
                    "6px 6px 0 rgba(0,0,0,0.4)",
                  ],
                }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                <span className="pixel-text text-white text-2xl">
                  ▶ DO THE QUEST NOW
                </span>
              </motion.button>

            </div>
          </Window>
        </motion.div>

        {/* Decorative danger elements */}
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute -top-12 -left-12 text-6xl opacity-50"
        >
          ⚠️
        </motion.div>
        <motion.div
          animate={{ rotate: [360, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-12 -right-12 text-6xl opacity-50"
        >
          ⚠️
        </motion.div>
        <motion.div
          animate={{ 
            y: [-20, 20, -20],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-1/2 -right-20 text-5xl"
        >
          🚨
        </motion.div>
        <motion.div
          animate={{ 
            y: [20, -20, 20],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-1/3 -left-20 text-5xl"
        >
          🚨
        </motion.div>
      </div>
    </div>
  );
}