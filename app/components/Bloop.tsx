import { motion } from "motion/react";
import mushroomIcon from "figma:asset/44cb14f30ec19ccce87828b8151a6de66f2fd5a6.png";

interface BloopProps {
  state: "healthy" | "weak" | "critical" | "happy" | "evolved";
  level?: number;
  animate?: boolean;
}

export function Bloop({
  state,
  level = 1,
  animate = true,
}: BloopProps) {
  const size = 80 + level * 12;

  const getFilter = () => {
    switch (state) {
      case "healthy":
        return "hue-rotate(330deg) saturate(1.3)";
      case "weak":
        return "grayscale(40%) brightness(0.85)";
      case "critical":
        return "grayscale(85%) brightness(0.65)";
      case "happy":
        return "hue-rotate(100deg) saturate(1.4)";
      case "evolved":
        return "hue-rotate(200deg) saturate(1.6) brightness(1.1)";
      default:
        return "";
    }
  };

  const animationProps = animate
    ? {
        y: [0, -10, 0],
        transition: {
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }
    : {};

  return (
    <motion.div
      className="relative inline-block"
      animate={animationProps}
      style={{ width: size, height: size }}
    >
      {/* Mushroom Image */}
      <img
        src={mushroomIcon}
        alt={`Bloop ${state}`}
        style={{
          width: size,
          height: size,
          imageRendering: "pixelated",
          filter: getFilter(),
        }}
      />

      {/* Evolved Glow Aura */}
      {state === "evolved" && (
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            boxShadow: "0 0 35px 12px rgba(0, 212, 255, 0.6)",
          }}
        />
      )}

      {/* Critical subtle flicker */}
      {state === "critical" && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{ duration: 0.6, repeat: Infinity }}
          style={{
            background: "rgba(255, 0, 0, 0.08)",
          }}
        />
      )}
    </motion.div>
  );
}