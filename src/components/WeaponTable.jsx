import { useState } from "react";
import { AttackDefenseValues, Button, Divider, ItemBG } from "zelda-hyrule-ui";
import { DEFENSE_LABEL, simplifyPerformance } from "../lib/performance.js";

function WeaponStat({ performance }) {
  const stat = simplifyPerformance(performance);
  const numericValue = Number(stat.statValue);
  const type = stat.statLabel === DEFENSE_LABEL ? "defense" : "attack";
  return <>{stat.statLabel && Number.isFinite(numericValue) ? <AttackDefenseValues type={type} value={numericValue} /> : stat.statLabel ? <span className="weapon-stat">{stat.statLabel} <strong>{stat.statValue}</strong></span> : null}</>;
}

function WeaponImage({ weapon }) {
  const [failed, setFailed] = useState(false);
  return (
    <ItemBG state={weapon.acquired ? "equipped" : "filled"} size={96} className="weapon-item-bg">
      {weapon.imageUrl && !failed ? <img className="weapon-image" src={weapon.imageUrl} alt={weapon.name} loading="lazy" onError={() => setFailed(true)} /> : <span className="image-placeholder">{weapon.imageUrl ? "加载失败" : "待获取"}</span>}
    </ItemBG>
  );
}

export function WeaponTable({ weapons, onUpdateAcquired }) {
  if (weapons.length === 0) return <div className="state-panel"><p>没有找到符合条件的武器。</p></div>;

  return (
    <section className="compendium-panel" aria-label="武器列表">
      <div className="table-shell">
        <table>
          <thead><tr><th>序号</th><th>图鉴影像</th><th>武器名称</th><th>特殊效果</th><th>容易获得的地方</th><th>获取记录</th></tr></thead>
          <tbody>
            {weapons.map((weapon, index) => {
              const performance = simplifyPerformance(weapon.performance);
              return (
                <tr key={weapon.id} className={weapon.acquired ? "is-acquired" : ""}>
                  <td className="row-number">{String(index + 1).padStart(3, "0")}</td>
                  <td><WeaponImage weapon={weapon} /></td>
                  <td><a className="weapon-name" href={weapon.detailUrl} target="_blank" rel="noopener noreferrer">{weapon.name}</a><WeaponStat performance={weapon.performance} /></td>
                  <td><span className="effect-value">{performance.effect}</span></td>
                  <td className="location-cell">{weapon.location || "不详"}</td>
                  <td><Button className="acquired-button" variant={weapon.acquired ? "sheikah" : "ghost"} size="small" onClick={() => onUpdateAcquired(weapon, !weapon.acquired)}>{weapon.acquired ? "已获取" : "标记获取"}</Button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Divider variant="ornament" className="table-footer-divider" />
    </section>
  );
}
