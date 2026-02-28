import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Home, Search, PlusSquare, Heart, User, X, MessageCircle } from "lucide-react";
import { InstagramPost } from "../components/InstagramPost";
import { BouncingIcon } from "../components/BouncingIcon";

export function Instagram() {
  const navigate = useNavigate();

  const [timeRemaining, setTimeRemaining] = useState(10);
  const [showWarning, setShowWarning] = useState(false);
  const [isCorrupted, setIsCorrupted] = useState(false);
  const [iconCount, setIconCount] = useState(0);

  useEffect(() => {
    if (timeRemaining > 0 && !isCorrupted) {
      const timer = setTimeout(() => {
        setTimeRemaining((prev) => prev - 1);

        if (timeRemaining === 4) {
          setShowWarning(true);
        }

        if (timeRemaining === 1) {
          setIsCorrupted(true);
          setShowWarning(false);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [timeRemaining, isCorrupted]);

  useEffect(() => {
    if (isCorrupted && iconCount < 12) {
      const timer = setTimeout(() => {
        setIconCount((prev) => prev + 1);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [isCorrupted, iconCount]);

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-bold font-serif">Instagram</h1>
          <div className="flex items-center gap-4">
            <Heart size={24} />
            <MessageCircle size={24} />
          </div>
        </div>
      </div>

      {/* Feed Placeholder */}
      <div className="max-w-lg mx-auto py-10 text-center text-gray-500">
        Fake Instagram Feed
      </div>

      {/* Corruption Overlay */}
      <AnimatePresence>
        {isCorrupted && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center"
            style={{
              background:
                "radial-gradient(circle at center, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.98) 100%)",
            }}
            initial={{ clipPath: "circle(0% at 50% 50%)" }}
            animate={{ clipPath: "circle(150% at 50% 50%)" }}
            transition={{ duration: 4, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {Array.from({ length: iconCount }).map((_, i) => (
                <BouncingIcon key={i} delay={i * 0.05} />
              ))}
            </div>

            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 4.5, duration: 0.5 }}
              onClick={() => navigate("/emergency")}
              className="relative z-50 bg-black text-white px-12 py-6 text-2xl shadow-2xl hover:scale-105 transition-transform"
            >
              Redeem Yourself
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}