import { useMemo, useState } from "react";
import { Card, Divider, SheikahBackground, SheikahScanlines, SheikahTextTitle } from "zelda-hyrule-ui";
import weaponsByGame from "../data/weapons.json";
import { clearAcquiredWeapons, readAcquiredWeapons, writeAcquiredWeapons } from "../lib/storage.js";
import { WeaponFilters } from "./WeaponFilters.jsx";
import { WeaponTable } from "./WeaponTable.jsx";

const gameOptions = [
  { key: "botw", label: "旷野之息", href: "#/" },
  { key: "totk", label: "王国之泪", href: "#/totk" }
];

export function WeaponAtlas({ gameKey }) {
  const [query, setQuery] = useState("");
  const [conditionFilter, setConditionFilter] = useState("all");
  const [acquiredFilter, setAcquiredFilter] = useState("all");
  const [acquiredIds, setAcquiredIds] = useState(readAcquiredWeapons);
  const [storageMessage, setStorageMessage] = useState("");
  const weapons = weaponsByGame[gameKey] || [];

  const weaponsWithState = useMemo(
    () => weapons.map((weapon) => ({ ...weapon, acquired: acquiredIds.has(weapon.id) })),
    [weapons, acquiredIds]
  );

  const visibleWeapons = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("zh-CN");

    return weaponsWithState.filter((weapon) => {
      if (acquiredFilter === "acquired" && !weapon.acquired) return false;
      if (acquiredFilter === "unacquired" && weapon.acquired) return false;

      const isPristine = weapon.name.includes("✨");
      if (gameKey === "totk" && conditionFilter === "pristine" && !isPristine) return false;
      if (gameKey === "totk" && conditionFilter === "decayed" && isPristine) return false;

      return !normalizedQuery || weapon.name.toLocaleLowerCase("zh-CN").includes(normalizedQuery);
    });
  }, [weaponsWithState, query, conditionFilter, acquiredFilter, gameKey]);

  const acquiredCount = useMemo(
    () => weapons.reduce((count, weapon) => count + Number(acquiredIds.has(weapon.id)), 0),
    [weapons, acquiredIds]
  );

  function handleAcquiredChange(weapon, acquired) {
    setAcquiredIds((current) => {
      const next = new Set(current);
      if (acquired) next.add(weapon.id);
      else next.delete(weapon.id);
      writeAcquiredWeapons(next);
      return next;
    });
    setStorageMessage(acquired ? `已记录：${weapon.name}` : `已取消：${weapon.name}`);
  }

  function resetFilters() {
    setQuery("");
    setConditionFilter("all");
    setAcquiredFilter("all");
  }

  function clearLocalData() {
    if (!window.confirm("确定要清除两款游戏的全部本地获取记录吗？")) return;
    clearAcquiredWeapons();
    setAcquiredIds(new Set());
    setStorageMessage("本地获取记录已全部清除");
  }

  return (
    <SheikahBackground color="darkBlue" className="app-shell">
      <SheikahScanlines opacity={0.06} animated />
      <header className="hero">
        <p className="eyebrow">HYRULE COMPENDIUM</p>
        <SheikahTextTitle title="海拉鲁武器图鉴" className="hero-title" />
        <nav className="game-switcher" aria-label="切换游戏">
          {gameOptions.map((game) => (
            <a key={game.key} href={game.href} className={game.key === gameKey ? "is-active" : ""} aria-current={game.key === gameKey ? "page" : undefined}>
              {game.label}
            </a>
          ))}
        </nav>
        <Divider variant="ornament" className="hero-divider" />
        <div className="summary-grid" aria-live="polite">
          <Card variant="sheikah" title="图鉴收录"><strong>{weapons.length}</strong><span>件武器资料</span></Card>
          <Card variant="golden" title="已获取"><strong>{acquiredCount}</strong><span>件完成记录</span></Card>
        </div>
      </header>

      <main className="container">
        <WeaponFilters
          query={query}
          condition={conditionFilter}
          acquired={acquiredFilter}
          resultCount={visibleWeapons.length}
          onQueryChange={setQuery}
          onConditionChange={setConditionFilter}
          onAcquiredChange={setAcquiredFilter}
          onReset={resetFilters}
          onClearLocalData={clearLocalData}
          showConditionFilter={gameKey === "totk"}
        />
        <p className="storage-status" aria-live="polite">{storageMessage}</p>
        <WeaponTable weapons={visibleWeapons} onUpdateAcquired={handleAcquiredChange} />
      </main>
    </SheikahBackground>
  );
}
