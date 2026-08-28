import { Button, Card, Divider, SettingsToggle } from "zelda-hyrule-ui";

const conditionLabels = ["全部", "全新武器", "腐蚀武器"];
const conditionValues = ["all", "pristine", "decayed"];
const conditionValueLabels = { all: "全部", pristine: "全新武器", decayed: "腐蚀武器" };
const acquiredLabels = ["全部", "已获取", "未获取"];
const acquiredValues = ["all", "acquired", "unacquired"];
const acquiredValueLabels = { all: "全部", acquired: "已获取", unacquired: "未获取" };

function StatusToggle({ label, options, value, valueLabels, values, onChange }) {
  function handleArrowClick(event) {
    const direction = event.target.closest("button")?.getAttribute("aria-label");
    if (!direction) return;
    event.preventDefault();
    event.stopPropagation();
    const currentIndex = options.indexOf(valueLabels[value]);
    const offset = direction === "Next option" ? 1 : -1;
    const nextIndex = Math.min(options.length - 1, Math.max(0, currentIndex + offset));
    onChange(values[nextIndex]);
  }

  return (
    <div className="filter-toggle-wrap" onClickCapture={handleArrowClick}>
      <SettingsToggle type="center" label={label} options={options} value={valueLabels[value]} onChange={(nextValue) => onChange(values[options.indexOf(nextValue)])} className="filter-toggle" />
    </div>
  );
}

export function WeaponFilters({ query, condition, acquired, resultCount, onQueryChange, onConditionChange, onAcquiredChange, onReset, onClearLocalData, showConditionFilter }) {
  return (
    <Card variant="sheikah" title="图鉴检索" className="filter-card">
      <div className={`filter-grid${showConditionFilter ? "" : " filter-grid--simple"}`}>
        <label className="field field--search">
          <span className="field__label">名称检索</span>
          <input value={query} type="search" placeholder="输入武器名称" onChange={(event) => onQueryChange(event.target.value)} />
        </label>
        {showConditionFilter ? <StatusToggle label="武器状态" options={conditionLabels} value={condition} valueLabels={conditionValueLabels} values={conditionValues} onChange={onConditionChange} /> : null}
        <StatusToggle label="获取状态" options={acquiredLabels} value={acquired} valueLabels={acquiredValueLabels} values={acquiredValues} onChange={onAcquiredChange} />
        <div className="filter-action">
          <span className="result-count">当前显示 <strong>{resultCount}</strong> 件</span>
          <div className="filter-buttons">
            <Button variant="ghost" size="small" onClick={onReset}>重置筛选</Button>
            <Button className="clear-data-button" variant="ghost" size="small" onClick={onClearLocalData}>清除本地数据</Button>
          </div>
        </div>
      </div>
      {showConditionFilter ? <><Divider variant="sheikah" className="filter-divider" /><p className="filter-hint">全新武器以 <span>✨</span> 标记；腐蚀武器为地表常见形态。</p></> : null}
    </Card>
  );
}
