const PALETTE = [
  { bg: '#e8f3ef', fg: '#2f7d63' },
  { bg: '#fbeaea', fg: '#b3403a' },
  { bg: '#eaeffb', fg: '#3b53a4' },
  { bg: '#fff3e0', fg: '#b9762b' },
  { bg: '#f5eafb', fg: '#7a3fa0' },
  { bg: '#eaf7f5', fg: '#1e8c7c' },
  { bg: '#fbeaf3', fg: '#b23e78' },
];

function hashString(value) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function getCategoryColors(category) {
  return PALETTE[hashString(category) % PALETTE.length];
}
