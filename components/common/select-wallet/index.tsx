import { FC, useContext } from 'react'
import { Image } from 'antd';
import { useWeb3 } from "@3rdweb/hooks";
import BaseCtx from '../../../hooks/use-base-content';

const SelectWallet: FC = () => {
  const { connectWallet } = useWeb3();
  const { setShowModal } = useContext(BaseCtx)

  return (
    <div className='w-full pl-8 pr-8'>
      <div
        className='flex items-center justify-center bg-gray-100 rounded mb-10 h-20 cursor-pointer'
        onClick={() => {
          connectWallet('injected')
          setShowModal!(false)
        }}
      >
        <Image
          src={'https://thirdweb.com/logos/metamask-fox.svg'}
          width={40}
          height={40}
          alt='metamask icon'
          preview={false}
        />
        <div className='ml-8 text-black text-xl font-bold'>MetaMask</div>
      </div>
    </div>
  )
}

export default SelectWallet;