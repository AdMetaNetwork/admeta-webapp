import { FC } from "react";

type Prop = {
  width?: number,
  height?: number,
  color?: string
}


const SuccessSvg: FC<Prop> = ({ width = 24, height = 24, color = 'white' }) => {
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3C7.03745 3 3 7.03745 3 12C3 16.9625 7.03745 21 12 21C16.9625 21 21 16.9625 21 12C21 7.03745 16.9625 3 12 3ZM16.6839 8.9837L10.8685 15.9068C10.8047 15.9828 10.7253 16.0441 10.6358 16.0868C10.5462 16.1294 10.4485 16.1523 10.3493 16.1538H10.3376C10.2406 16.1538 10.1446 16.1334 10.056 16.0939C9.96735 16.0544 9.88802 15.9967 9.82313 15.9245L7.33082 13.1553C7.26752 13.0882 7.21828 13.009 7.186 12.9226C7.15371 12.8362 7.13903 12.7442 7.14282 12.652C7.1466 12.5598 7.16877 12.4693 7.20803 12.3858C7.24729 12.3023 7.30285 12.2275 7.37143 12.1658C7.44002 12.104 7.52025 12.0566 7.60741 12.0264C7.69457 11.9961 7.7869 11.9836 7.87898 11.9895C7.97106 11.9954 8.06102 12.0197 8.14359 12.0609C8.22615 12.1021 8.29965 12.1593 8.35976 12.2293L10.3194 14.4066L15.6238 8.09322C15.7428 7.95566 15.9111 7.87044 16.0924 7.856C16.2737 7.84155 16.4534 7.89903 16.5927 8.01601C16.732 8.133 16.8196 8.30009 16.8367 8.48116C16.8537 8.66224 16.7989 8.84276 16.6839 8.9837V8.9837Z" fill={color} />
    </svg>
  )
}
export default SuccessSvg;