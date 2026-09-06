type BrandMarkProps = {
  className?: string;
};

export function BrandMark({ className = 'h-9 w-9' }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="64" height="64" rx="18" fill="url(#brand-mark-bg)" />
      <rect
        x="14"
        y="15"
        width="15"
        height="15"
        rx="5"
        fill="white"
        fillOpacity="0.18"
      />
      <rect
        x="35"
        y="15"
        width="15"
        height="15"
        rx="5"
        fill="white"
        fillOpacity="0.18"
      />
      <rect
        x="14"
        y="36"
        width="15"
        height="15"
        rx="5"
        fill="white"
        fillOpacity="0.18"
      />
      <path
        d="M37.5 20.5H47.5"
        stroke="white"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M37.5 27H44.5"
        stroke="white"
        strokeOpacity="0.75"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M18 23.5L21.5 27L27 20.5"
        stroke="white"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18 44.5L21.5 48L27 41.5"
        stroke="white"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M34.5 42.5L40 48L50 36"
        stroke="#F59E0B"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="50" cy="36" r="4" fill="#FCD34D" fillOpacity="0.35" />
      <defs>
        <linearGradient
          id="brand-mark-bg"
          x1="8"
          y1="6"
          x2="56"
          y2="58"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0F172A" />
          <stop offset="0.55" stopColor="#155E75" />
          <stop offset="1" stopColor="#0F766E" />
        </linearGradient>
      </defs>
    </svg>
  );
}
