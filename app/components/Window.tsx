import { motion } from "motion/react";
import { X, Minus, Square } from "lucide-react";

interface WindowProps {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
  showControls?: boolean;
  icon?: React.ReactNode;
}

export function Window({ 
  title, 
  children, 
  onClose, 
  className = "", 
  showControls = false,
  icon
}: WindowProps) {
  return (
    <motion.div
      className={`win95-window overflow-hidden ${className}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
    >
      {/* Title Bar */}
      <div className="win95-title-bar active">
        <div className="flex items-center gap-2">
          {icon && (
            <div className="w-4 h-4 flex items-center justify-center">
              {icon}
            </div>
          )}
          <span className="win95-title-text">{title}</span>
        </div>
        
        {showControls && (
          <div className="flex gap-1">
            <button 
              className="win95-button-icon flex items-center justify-center"
              onClick={onClose}
            >
              <Minus className="w-3 h-3" strokeWidth={3} />
            </button>
            <button 
              className="win95-button-icon flex items-center justify-center"
            >
              <Square className="w-2 h-2" strokeWidth={3} />
            </button>
            <button 
              className="win95-button-icon flex items-center justify-center"
              onClick={onClose}
            >
              <X className="w-3 h-3" strokeWidth={3} />
            </button>
          </div>
        )}
      </div>

      {/* Window Content */}
      <div className="p-2">
        {children}
      </div>
    </motion.div>
  );
}
