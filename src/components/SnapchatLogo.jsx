// Snapchat Ghost Logo SVG Component
const SnapchatLogo = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Ghost body with outline */}
      <path
        d="M50 8C32 8 18 22 18 40C18 48 18 52 18 58C16 58 12 56 10 56C8 56 6 58 6 60C6 62 8 64 12 66C16 68 20 70 22 72C24 76 26 82 50 82C74 82 76 76 78 72C80 70 84 68 88 66C92 64 94 62 94 60C94 58 92 56 90 56C88 56 84 58 82 58C82 52 82 48 82 40C82 22 68 8 50 8Z"
        fill="none"
        stroke="black"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Eyes */}
      <ellipse cx="38" cy="44" rx="5" ry="6" fill="black" />
      <ellipse cx="62" cy="44" rx="5" ry="6" fill="black" />
    </svg>
  );
};

export default SnapchatLogo;
