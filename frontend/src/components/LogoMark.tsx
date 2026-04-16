/** 32×32 mark aligned with static HTML nav (blue roundel + document strokes). */
export function LogoMark() {
  return (
    <svg
      className="nav-logo-mark"
      width={32}
      height={32}
      viewBox="0 0 32 32"
      aria-hidden
    >
      <circle cx="16" cy="16" r="16" fill="#2563eb" />
      <path
        fill="#fff"
        d="M10 9h12a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H10a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1Zm1 2v10h10V11H11Zm1 2h8v1.5h-8V13Zm0 3h8v1.5h-8V16Zm0 3h5v1.5h-5V19Z"
        opacity={0.95}
      />
    </svg>
  )
}
