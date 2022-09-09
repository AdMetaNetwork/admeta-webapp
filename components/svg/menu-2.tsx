import { FC } from "react";

type Prop = {
  color?: string
}

const Meun2Svg: FC<Prop> = ({ color = '#777E90' }) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_1155_4639)">
        <path d="M10 4.28125C11.0875 4.28125 11.9688 5.1625 11.9688 6.25C11.9688 7.3375 11.0875 8.21875 10 8.21875C8.9125 8.21875 8.03125 7.3375 8.03125 6.25C8.03125 5.1625 8.9125 4.28125 10 4.28125ZM10 2.5C7.92813 2.5 6.25 4.17813 6.25 6.25C6.25 8.32187 7.92813 10 10 10C12.0719 10 13.75 8.32187 13.75 6.25C13.75 4.17813 12.0719 2.5 10 2.5Z" fill={color} />
        <path fillRule="evenodd" clipRule="evenodd" d="M10 10.9375C7.49687 10.9375 2.5 12.1937 2.5 14.6875V17.5H17.5V14.6875C17.5 12.1937 12.5031 10.9375 10 10.9375ZM10 12.7187C12.7844 12.7187 15.7187 14.0875 15.7187 14.6875V15.7187H4.28125V14.6875C4.28125 14.0875 7.21562 12.7187 10 12.7187Z" fill={color} />
      </g>
      <defs>
        <clipPath id="clip0_1155_4639">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
export default Meun2Svg;