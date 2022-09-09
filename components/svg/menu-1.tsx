import { FC } from "react";

type Prop = {
  color?: string
}

const Menu1Svg: FC<Prop> = ({ color = '#777E90' }) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.5 17.5V12.5H9.16667V17.5H2.5ZM4.16667 15.8333H7.5V14.1667H4.16667V15.8333ZM10.8333 2.5H17.5V7.5H10.8333V2.5ZM12.5 4.16667V5.83333H15.8333V4.16667H12.5Z" fill={color} />
      <path fillRule="evenodd" clipRule="evenodd" d="M2.5 10.8333V2.5H9.16667V10.8333H2.5ZM10.8333 17.5V9.16667H17.5V17.5H10.8333ZM7.5 4.16667V9.16667H4.16667V4.16667H7.5ZM15.8333 15.8333H12.5V10.8333H15.8333V15.8333Z" fill={color} />
    </svg>

  )
}
export default Menu1Svg;