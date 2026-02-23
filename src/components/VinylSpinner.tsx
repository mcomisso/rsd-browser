export default function VinylSpinner({ size = 200 }: { size?: number }) {
  return (
    <div
      className="animate-spin-slow relative rounded-full"
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 200 200" className="h-full w-full">
        {/* Outer disc */}
        <circle cx="100" cy="100" r="98" fill="#1a1a1a" stroke="#333" strokeWidth="2" />
        {/* Grooves */}
        {[85, 75, 65, 55, 45].map((r) => (
          <circle
            key={r}
            cx="100"
            cy="100"
            r={r}
            fill="none"
            stroke="#2a2a2a"
            strokeWidth="1"
            opacity="0.6"
          />
        ))}
        {/* Label area */}
        <circle cx="100" cy="100" r="32" fill="#d97706" />
        <circle cx="100" cy="100" r="28" fill="#f59e0b" />
        <text
          x="100"
          y="96"
          textAnchor="middle"
          fontSize="8"
          fontWeight="bold"
          fill="#18181b"
        >
          RECORD
        </text>
        <text
          x="100"
          y="108"
          textAnchor="middle"
          fontSize="7"
          fill="#18181b"
        >
          STORE DAY
        </text>
        {/* Center hole */}
        <circle cx="100" cy="100" r="5" fill="#0a0a0a" />
        {/* Shine effect */}
        <ellipse
          cx="70"
          cy="70"
          rx="40"
          ry="20"
          fill="white"
          opacity="0.03"
          transform="rotate(-30 70 70)"
        />
      </svg>
    </div>
  );
}
