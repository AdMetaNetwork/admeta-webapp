import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { WagmiConfig, createConfig, configureChains } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { sepolia } from 'wagmi/chains';
import { ConnectKitProvider } from 'connectkit';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia],
  [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || 'yourAlchemyApiKey' }), publicProvider()],
)

const config = createConfig({
  autoConnect: false,
  connectors: [
    new MetaMaskConnector({ chains })
  ],
  publicClient,
  webSocketPublicClient, 
})

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <WagmiConfig config={config}>
      <ConnectKitProvider
        debugMode
      >
        <Component {...pageProps} />
      </ConnectKitProvider>
    </WagmiConfig>
  );
}

export default MyApp
