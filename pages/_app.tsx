import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThirdwebWeb3Provider } from "@3rdweb/hooks";
import 'events'

function MyApp({ Component, pageProps }: AppProps) {
  const supportedChainIds = [1, 4, 137, 250, 43114, 80001];

  const connectors = {
    injected: {},
  };

  return (
    <ThirdwebWeb3Provider
      supportedChainIds={supportedChainIds}
      connectors={connectors}
    >
      <Component {...pageProps} />
    </ThirdwebWeb3Provider>
  );
}

export default MyApp
