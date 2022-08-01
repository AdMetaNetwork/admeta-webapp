import { FC } from "react";


const CircleSvg: FC = () => {
  return (
    <svg width="557" height="557" viewBox="0 0 557 557" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_446_2145)">
        <g clipPath="url(#clip0_446_2145)">
          <ellipse cx="258" cy="238.5" rx="188" ry="187.5" fill="url(#paint0_linear_446_2145)" />
          <g filter="url(#filter1_f_446_2145)">
            <path d="M587.838 97.5354C655.763 277.705 644.923 414.277 303.317 394.25C88.9989 327.416 -22.2761 459.413 -241.444 421.734C-54.1719 97.5355 -15.4308 336.478 128.809 280.348C308.629 210.373 238.113 -285.197 587.838 97.5354Z" fill="url(#paint1_linear_446_2145)" />
          </g>
        </g>
      </g>
      <defs>
        <filter id="filter0_d_446_2145" x="0" y="0" width="557" height="557" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dx="21" dy="40" />
          <feGaussianBlur stdDeviation="45.5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_446_2145" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_446_2145" result="shape" />
        </filter>
        <filter id="filter1_f_446_2145" x="-377.234" y="-181.866" width="1133.94" height="746.293" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="67.8953" result="effect1_foregroundBlur_446_2145" />
        </filter>
        <linearGradient id="paint0_linear_446_2145" x1="140.01" y1="163.847" x2="9.75645" y2="-1.95881" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E3E0FF" />
          <stop offset="1" stopColor="white" />
        </linearGradient>
        <linearGradient id="paint1_linear_446_2145" x1="527.334" y1="31.3733" x2="153.845" y2="616.677" gradientUnits="userSpaceOnUse">
          <stop offset="0.0238694" stopColor="#6DC1DC" />
          <stop offset="0.233824" stopColor="#A690FC" />
          <stop offset="0.60602" stopColor="#FC96BB" />
          <stop offset="1" stopColor="#FFC397" />
        </linearGradient>
        <clipPath id="clip0_446_2145">
          <rect x="70" y="51" width="375" height="375" rx="187.5" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default CircleSvg;