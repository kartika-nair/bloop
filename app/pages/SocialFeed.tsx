import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import {
  Home,
  Search,
  PlusSquare,
  Heart,
  User,
  X,
  MessageCircle,
} from "lucide-react";
import { InstagramPost } from "../components/InstagramPost";
import { BouncingIcon } from "../components/BouncingIcon";

const posts = [
  {
    id: 1,
    username: "traveler_jane",
    userAvatar:
      "https://images.unsplash.com/photo-1594318223885-20dc4b889f9e?w=100&h=100&fit=crop",
    postImage:
      "https://images.unsplash.com/photo-1712330138676-60e86456c218?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBsYW5kc2NhcGUlMjBzY2VuaWN8ZW58MXx8fHwxNzcyMjQxMDkyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    likes: 1234,
    caption: "What a beautiful view! 🌄",
    timeAgo: "2 hours ago",
  },
  {
    id: 2,
    username: "foodie_adventures",
    userAvatar:
      "https://images.unsplash.com/photo-1594318223885-20dc4b889f9e?w=100&h=100&fit=crop",
    postImage:
      "https://images.unsplash.com/photo-1565020764063-00af30f184cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwcGhvdG9ncmFwaHklMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NzIyODcxNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    likes: 856,
    caption: "Brunch goals 🍳✨",
    timeAgo: "5 hours ago",
  },
  {
    id: 3,
    username: "urban_explorer",
    userAvatar:
      "https://images.unsplash.com/photo-1594318223885-20dc4b889f9e?w=100&h=100&fit=crop",
    postImage:
      "https://images.unsplash.com/photo-1762436933065-fe6d7f51d4f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMHN0cmVldCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc3MjIyODcxMnww&ixlib=rb-4.1.0&q=80&w=1080",
    likes: 2341,
    caption: "City vibes 🏙️",
    timeAgo: "1 day ago",
  },
];

export function SocialFeed() {
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState(10); // 10 seconds for demo
  const [showWarning, setShowWarning] = useState(false);
  const [isCorrupted, setIsCorrupted] = useState(false);
  const [iconCount, setIconCount] = useState(0);

  useEffect(() => {
    if (timeRemaining > 0 && !isCorrupted) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);

        // Show warning at 3 seconds
        if (timeRemaining === 4) {
          setShowWarning(true);
        }

        // Start corruption at 0
        if (timeRemaining === 1) {
          setIsCorrupted(true);
          setShowWarning(false);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [timeRemaining, isCorrupted]);

  // Generate icons gradually after blackness spreads
  useEffect(() => {
    if (isCorrupted && iconCount < 12) {
      const timer = setTimeout(() => {
        setIconCount(iconCount + 1);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isCorrupted, iconCount]);

  const handleRedeem = () => {
    setIsCorrupted(false);
    setTimeRemaining(10);
    setIconCount(0);
    setShowWarning(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Instagram Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-bold font-serif">
            Instagram
          </h1>
          <div className="flex items-center gap-4">
            <Heart size={24} />
            <MessageCircle size={24} />
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="max-w-lg mx-auto">
        {posts.map((post) => (
          <InstagramPost key={post.id} {...post} />
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-2 flex items-center justify-around">
          <Home size={28} />
          <Search size={28} />
          <PlusSquare size={28} />
          <Heart size={28} />
          <User size={28} />
        </div>
      </div>

      {/* Warning Notification */}
      <AnimatePresence>
        {showWarning && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-orange-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 max-w-sm"
          >
            <div className="flex-1">
              <div className="font-semibold">
                Screen Time Warning
              </div>
              <div className="text-sm">
                You're running low on screentime
              </div>
            </div>
            <button
              onClick={() => setShowWarning(false)}
              className="text-white hover:text-gray-200"
            >
              <X size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Corruption Effect */}
      <AnimatePresence>
        {isCorrupted && (
          <>
            {/* Black Mass */}
            <motion.div
              className="fixed inset-0 z-40 flex items-center justify-center"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.98) 100%)",
              }}
              initial={{ clipPath: "circle(0% at 50% 50%)" }}
              animate={{ clipPath: "circle(150% at 50% 50%)" }}
              transition={{ duration: 4, ease: "easeInOut" }}
            >
              {/* Icons Container */}
              <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
                <div className="relative">
                  {Array.from({ length: iconCount }).map(
                    (_, i) => (
                      <BouncingIcon key={i} delay={i * 0.05} />
                    ),
                  )}
                </div>
              </div>

              {/* Redeem Button */}
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 4.5, duration: 0.5 }}
                onClick={() => navigate("/emergency")}
                className="relative z-50 bg-black text-white px-12 py-6 text-2xl shadow-2xl transform hover:scale-105 transition-transform overflow-hidden"
                style={{
                  fontFamily: "'Press Start 2P', monospace",
                  textShadow:
                    "3px 3px 0px #ff0000, -3px -3px 0px #00ffff",
                  border: "4px solid white",
                  imageRendering: "pixelated",
                }}
              >
                <motion.span
                  className="absolute inset-0 flex items-center justify-center text-red-600"
                  animate={{
                    x: [0, -3, 3, -2, 2, 0],
                    opacity: [0, 0.7, 0, 0.5, 0, 0.8, 0],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    repeatDelay: 0.5,
                  }}
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                  }}
                >
                  Redeem Yourself
                </motion.span>
                Redeem Yourself
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Debug Timer (remove in production) */}
      {!isCorrupted && (
        <div className="fixed top-4 right-4 bg-black text-white px-3 py-2 rounded-lg text-sm z-50">
          Time: {timeRemaining}s
        </div>
      )}
    </div>
  );
}
