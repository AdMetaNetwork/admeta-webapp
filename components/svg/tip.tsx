import { FC } from "react";

type Prop = {
  handlerOpenTip: () => void,
  size?: number,
  color?: string
}

const TipSvg: FC<Prop> = ({ handlerOpenTip, size = 18, color = '#353A47' }) => {
  return (
    <svg style={{ cursor: 'pointer' }} onClick={handlerOpenTip} width={size} height={size} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 16.5C4.85775 16.5 1.5 13.1423 1.5 9C1.5 4.85775 4.85775 1.5 9 1.5C13.1423 1.5 16.5 4.85775 16.5 9C16.5 13.1423 13.1423 16.5 9 16.5ZM8.25 8.25V12.75H9.75V8.25H8.25ZM8.25 5.25V6.75H9.75V5.25H8.25Z" fill={color} />
    </svg>
  )
}
export default TipSvg;
