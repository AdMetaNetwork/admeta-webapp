import { ApiPromise, WsProvider } from '@polkadot/api';


export class PolkadotChainConnector {
    async getTargetMetadata(): Promise<any> {

        const wsProvider = new WsProvider('ws://testnet.admeta.network:9944');
        const api = await ApiPromise.create({ provider: wsProvider });

        const resp = await api.query.ad.impressionAds(1);
        // let respJson = resp.toJSON();
        // console.log('getTargetMetadata:' + JSON.stringify(respJson));
        let respStr = JSON.parse(resp.toString());
        // let meta = metadataJson?['metadata']
        // metadataJson["metadata"]
        let meta = respStr['metadata'];
        // let parsedMeta = String.fromCharCode(meta);
        // let parsedMeta =meta.toString();
        let parsedMeta = Buffer.from(meta.toString(), "hex").toString();
        console.log('meta is: ' + JSON.stringify(meta));
        console.log("parsed meta is: " + parsedMeta);
        return meta;
    }
}