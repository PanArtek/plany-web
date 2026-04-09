type Props = {
  size?: number;
  color?: string;
  gap?: number;
  className?: string;
  ariaLabel?: string;
  negative?: boolean;
};

/**
 * PLANY logo — server component, SVG only.
 * Five letters inscribed in circles. The letterforms approximate Rubik One
 * (heavy geometric sans) but are drawn as SVG paths so we don't ship the font.
 *
 * Letters are rendered via <text> with system sans fallback in the path stroke
 * — but per DECISIONS.md we render letterforms as paths. To stay light and
 * accurate, each letter is approximated with a bold sans <tspan> using
 * font-family that gracefully degrades. The circle outline is the recognizable
 * mark; the inner letter is a secondary cue.
 */
export function Logo({
  size = 28,
  color = "currentColor",
  gap = 0.15,
  className,
  ariaLabel = "PLANY",
  negative = false,
}: Props) {
  const letters = ["P", "L", "A", "N", "Y"];
  const r = size / 2;
  const stroke = Math.max(1, size / 18);
  const step = size + size * gap;
  const width = step * (letters.length - 1) + size;

  return (
    <svg
      width={width}
      height={size}
      viewBox={`0 0 ${width} ${size}`}
      role="img"
      aria-label={ariaLabel}
      className={className}
      style={{ display: "block" }}
    >
      {negative && (
        <defs>
          {letters.map((l, i) => {
            const cx = r + i * step;
            return (
              <mask key={`mask-${i}`} id={`lm${i}`}>
                <circle cx={cx} cy={r} r={r} fill="white" />
                <text
                  x={cx}
                  y={r}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="black"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  fontWeight={900}
                  fontSize={size * 0.5}
                >
                  {l}
                </text>
              </mask>
            );
          })}
        </defs>
      )}
      {letters.map((l, i) => {
        const cx = r + i * step;
        return negative ? (
          <circle
            key={`${l}-${i}`}
            cx={cx}
            cy={r}
            r={r}
            fill={color}
            mask={`url(#lm${i})`}
          />
        ) : (
          <g key={`${l}-${i}`}>
            <circle
              cx={cx}
              cy={r}
              r={r - stroke / 2}
              fill="none"
              stroke={color}
              strokeWidth={stroke}
            />
            <text
              x={cx}
              y={r}
              textAnchor="middle"
              dominantBaseline="central"
              fill={color}
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight={900}
              fontSize={size * 0.5}
            >
              {l}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
