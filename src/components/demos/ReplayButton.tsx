export function ReplayButton({ onClick }: { onClick: () => void }) {
  return (
    <button className="replay" onClick={onClick}>
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M3 12a9 9 0 1 0 3-6.7M3 4v4h4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Replay
    </button>
  );
}
