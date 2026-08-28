const ATTACK_LABEL = "攻击力";
const DEFENSE_LABEL = "防御力";
const EMPTY_VALUE = "无";

export function simplifyPerformance(value = "") {
  const parts = value.split("、").map((part) => part.trim()).filter(Boolean);
  const stat = parts[0]?.match(new RegExp(`^(${ATTACK_LABEL}|${DEFENSE_LABEL})(.+)$`));

  if (!stat) {
    return { statLabel: "", statValue: "", effect: value || EMPTY_VALUE };
  }

  return {
    statLabel: stat[1],
    statValue: stat[2],
    effect: parts.slice(1).join("、") || EMPTY_VALUE
  };
}

export { ATTACK_LABEL, DEFENSE_LABEL };
