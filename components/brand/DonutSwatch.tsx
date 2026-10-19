/** Drawn donut for flavours that have never had their own photo posted: glaze ring, filling peeking out. */
export function DonutSwatch({ glaze, filling, className }: { glaze: string; filling: string; className?: string }) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden className={className}>
      <ellipse cx="60" cy="104" rx="38" ry="6" fill="rgb(58 21 48 / 0.12)" />
      <circle cx="60" cy="60" r="42" fill="#e9b47a" />
      <path d="M18 58a42 42 0 0 1 84 0c-6 8-12 2-17 8s-10-2-15 6-11-1-16 4-11-6-17-2-13-8-19-16z" fill={glaze} />
      <circle cx="60" cy="58" r="11" fill={filling} stroke="rgb(58 21 48 / 0.15)" strokeWidth="1.5" />
      <path d="M34 40l7-3M78 34l6 4M86 56l3 7M40 66l-4 6" stroke="#fffaf7" strokeWidth="3.5" strokeLinecap="round" opacity=".8" />
    </svg>
  );
}
