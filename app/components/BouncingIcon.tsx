import { motion } from 'motion/react';
import { Heart, MessageCircle, Home, User, Search } from 'lucide-react';

interface BouncingIconProps {
  delay?: number;
}

const icons = [Heart, MessageCircle, Home, User, Search];
const colors = ['#ff1493', '#00d4ff', '#32cd32', '#ff6b35', '#9b59b6'];

export function BouncingIcon({ delay = 0 }: BouncingIconProps) {
  const Icon = icons[Math.floor(Math.random() * icons.length)];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const startX = Math.random() * window.innerWidth - window.innerWidth / 2;
  const startY = Math.random() * window.innerHeight - window.innerHeight / 2;
  const size = 30 + Math.random() * 40;

  return (
    <motion.div
      className="absolute"
      initial={{
        x: 0,
        y: 0,
        scale: 0,
        opacity: 0,
      }}
      animate={{
        x: [0, startX, startX + Math.random() * 100 - 50],
        y: [0, startY, startY + Math.random() * 100 - 50],
        scale: [0, 1, 0.8, 1.2, 1],
        opacity: [0, 1, 0.8, 0.6],
        rotate: [0, 360, 720],
      }}
      transition={{
        delay,
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      }}
      style={{
        color,
        filter: 'drop-shadow(0 0 10px currentColor)',
      }}
    >
      <Icon size={size} strokeWidth={2.5} />
    </motion.div>
  );
}
