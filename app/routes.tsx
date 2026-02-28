import { createBrowserRouter } from "react-router";
import { Onboarding } from "./pages/Onboarding";
import { Home } from "./pages/Home";
import { LevelMap } from "./pages/LevelMap";
import { Stats } from "./pages/Stats";
import { LevelUp } from "./pages/LevelUp";
import { Emergency } from "./pages/Emergency";
import { LevelPlay } from "./pages/LevelPlay";
import { SocialFeed } from "./pages/SocialFeed";
import { Instagram } from "./pages/Instagram";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Onboarding,
  },
  {
    path: "/home",
    Component: Home,
  },
  {
    path: "/levels",
    Component: LevelMap,
  },
  {
    path: "/level/:levelId",
    Component: LevelPlay,
  },
  {
    path: "/stats",
    Component: Stats,
  },
  {
    path: "/level-up",
    Component: LevelUp,
  },
  {
    path: "/emergency",
    Component: Emergency,
  },
  {
    path: "/social-feed",
    Component: SocialFeed,
  },
]);