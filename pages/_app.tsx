import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { WagmiConfig, createConfig } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';

const config = createConfig(
  getDefaultConfig({
    appName: 'AdMeta App',
    chains: [sepolia],
    walletConnectProjectId: process.env.PUBLIC_WALLETCONNECT_PROJECT_ID || '',
  })
);

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
