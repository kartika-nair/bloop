import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Bloop } from "../components/Bloop";
import { Window } from "../components/Window";

export function Onboarding() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigate("/home");
    }
  };

  return (
    <div
      className="min-h-screen pixel-cursor scanlines"
      style={{ backgroundColor: "#87CEEB" }}
    >
      <div className="max-w-3xl mx-auto p-4 pb-24">

        {/* Header */}
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
              filter: "drop-shadow(3px 3px 0 rgba(0,0,0,0.5))",
            }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            BLOOP
          </motion.h1>
        </motion.div>

        {/* Main Window */}
        <Window
          title="ONBOARDING.EXE"
          showControls={true}
          className="mb-4"
        >
          <div className="win95-inset p-8 min-h-[500px] flex items-center justify-center">

            <AnimatePresence mode="wait">

              {/* STEP 1 */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-center max-w-md"
                >
                  <div className="mb-6">
                    <Bloop state="healthy" level={1} />
                  </div>

                  <h1 className="pixel-text text-2xl mb-4">
                    Meet Bloop
                  </h1>

                  <p className="pixel-text-sm text-gray-700 mb-6">
                    Your new companion who thrives on your social life!
                  </p>

                  <button
                    onClick={handleNext}
                    className="win95-button px-8 py-3"
                  >
                    <span className="pixel-text-sm">NEXT →</span>
                  </button>
                </motion.div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className="text-center max-w-md"
                >
                  <div className="win95-window p-4 mb-6">
                    <div className="space-y-4">

                      <div className="win95-inset p-3 text-left">
                        <p className="pixel-text-sm">
                          📱 Screen Time Access
                        </p>
                        <p className="text-[10px] text-gray-600">
                          Track your usage
                        </p>
                      </div>

                      <div className="win95-inset p-3 text-left">
                        <p className="pixel-text-sm">
                          📊 App Usage Tracking
                        </p>
                        <p className="text-[10px] text-gray-600">
                          Monitor your habits
                        </p>
                      </div>

                    </div>
                  </div>

                  <h2 className="pixel-text text-xl mb-3">
                    Permissions
                  </h2>

                  <p className="pixel-text-sm text-gray-700 mb-6">
                    We need these to help Bloop stay healthy!
                  </p>

                  <button
                    onClick={handleNext}
                    className="win95-button px-8 py-3"
                  >
                    <span className="pixel-text-sm">ALLOW →</span>
                  </button>
                </motion.div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="text-center max-w-md"
                >
                  <div className="mb-6">
                    <Bloop state="happy" level={1} />
                  </div>

                  <div className="win95-inset p-4 mb-6">
                    <p className="pixel-text text-sm italic">
                      "Please don't doomscroll me!"
                    </p>
                  </div>

                  <button
                    onClick={handleNext}
                    className="win95-button px-10 py-4"
                  >
                    <span className="pixel-text-sm">
                      ENTER BLOOP MODE
                    </span>
                  </button>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </Window>

        {/* Back button */}
        <button
          onClick={() => navigate("/home")}
          className="win95-button px-6 py-3"
        >
          <span className="pixel-text-sm">← BACK TO HOME</span>
        </button>
      </div>
    </div>
  );
}
