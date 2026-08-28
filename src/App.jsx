import { useEffect, useState } from "react";
import { WeaponAtlas } from "./components/WeaponAtlas.jsx";

function gameFromHash() {
  return window.location.hash === "#/totk" ? "totk" : "botw";
}

export function App() {
  const [gameKey, setGameKey] = useState(gameFromHash);

  useEffect(() => {
    const handleHashChange = () => setGameKey(gameFromHash());
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return <WeaponAtlas gameKey={gameKey} />;
}
