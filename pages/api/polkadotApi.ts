import { ApiPromise, WsProvider } from "@polkadot/api";

export class PolkadotChainConnector {
  async getTargetMetadata(): Promise<string> {
    const wsProvider = new WsProvider("ws://testnet.admeta.network:9944");
    const api = await ApiPromise.create({ provider: wsProvider });
    const resp = await api.query.ad.impressionAds(1);
    let respStr = JSON.parse(resp.toString());
    let meta = respStr["metadata"];
    let parsedMeta = Buffer.from(meta.slice(2), "hex").toString();
    console.log("meta is: " + JSON.stringify(meta));
    console.log("parsed meta is: " + parsedMeta);
    return parsedMeta;
  }
}
