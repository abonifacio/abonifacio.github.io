const COLOR_SCHEMES = ["green", "purple", "yellow", "pink", "blue", "orange"];

function hashCode(text: string) {
  let hash = 0;
  let i;
  let chr;
  for (i = 0; i < text.length; i += 1) {
    chr = text.charCodeAt(i);
    // eslint-disable-next-line no-bitwise
    hash = (hash << 5) - hash + chr;
    // eslint-disable-next-line no-bitwise
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

export default function getColorScheme(text: string): string {
  const hash = hashCode(text);
  return COLOR_SCHEMES[Math.abs(hash) % COLOR_SCHEMES.length];
}
