import { FC } from "react";

type Prop = {
  size?: number,
  color?: string
}

const CheckOutlinedSvg: FC<Prop> = ({ size = 24, color = '#525461' }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 9.99967L8.66667 12.6663L14 7.33301" stroke={color} strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="0.5" y="0.5" width="19" height="19" rx="9.5" stroke={color} />
    </svg>
  )
}
export default CheckOutlinedSvg;
