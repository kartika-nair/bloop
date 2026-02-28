import { createContext, useContext, useState, ReactNode } from "react";

interface Level {
  id: number;
  name: string;
  quest: string;
  reward: number;
  completed: boolean;
  unlocked: boolean;
}

interface GameState {
  currentLevel: number;
  totalPoints: number;
  streak: number;
  health: number;
  screenTimeToday: number;
  levels: Level[];
  completeLevel: (levelId: number) => void;
  addPoints: (points: number) => void;
  updateHealth: (health: number) => void;
  incrementStreak: () => void;
}

const GameContext = createContext<GameState | undefined>(undefined);

const initialLevels: Level[] = [
  {
    id: 1,
    name: "Shy Sprout",
    quest: "Find someone wearing blue and say hello",
    reward: 100,
    completed: false,
    unlocked: true,
  },
  {
    id: 2,
    name: "Friendly Face",
    quest: "Take a walk and upload a photo of the sky",
    reward: 150,
    completed: false,
    unlocked: false,
  },
  {
    id: 3,
    name: "Social Butterfly",
    quest: "Start a conversation with 3 people",
    reward: 200,
    completed: false,
    unlocked: false,
  },
  {
    id: 4,
    name: "Party Starter",
    quest: "Organize a hangout with friends",
    reward: 300,
    completed: false,
    unlocked: false,
  },
  {
    id: 5,
    name: "Connection Master",
    quest: "Help someone with something they need",
    reward: 500,
    completed: false,
    unlocked: false,
  },
];

export function GameProvider({ children }: { children: ReactNode }) {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [totalPoints, setTotalPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [health, setHealth] = useState(100);
  const [screenTimeToday] = useState(45); // minutes
  const [levels, setLevels] = useState<Level[]>(initialLevels);

  const completeLevel = (levelId: number) => {
    setLevels((prevLevels) =>
      prevLevels.map((level) => {
        if (level.id === levelId) {
          return { ...level, completed: true };
        }
        if (level.id === levelId + 1) {
          return { ...level, unlocked: true };
        }
        return level;
      })
    );
    
    const completedLevel = levels.find((l) => l.id === levelId);
    if (completedLevel) {
      addPoints(completedLevel.reward);
      setHealth(Math.min(100, health + 20));
      incrementStreak();
    }
    
    setCurrentLevel(levelId + 1);
  };

  const addPoints = (points: number) => {
    setTotalPoints((prev) => prev + points);
  };

  const updateHealth = (newHealth: number) => {
    setHealth(Math.max(0, Math.min(100, newHealth)));
  };

  const incrementStreak = () => {
    setStreak((prev) => prev + 1);
  };

  return (
    <GameContext.Provider
      value={{
        currentLevel,
        totalPoints,
        streak,
        health,
        screenTimeToday,
        levels,
        completeLevel,
        addPoints,
        updateHealth,
        incrementStreak,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
