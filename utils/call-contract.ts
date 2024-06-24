import { ethers, BigNumber } from 'ethers'
import detectEthereumProvider from "@metamask/detect-provider";
import * as C from '../config/constant'
import * as T from './type'
import * as O from './tools'
import axios from 'axios';

class CallContract {
  private signer: ethers.providers.JsonRpcSigner | undefined
  contract: ethers.Contract | undefined

  constructor() {}

  async init() {
    try {
      const p = await detectEthereumProvider()
      const provider = new ethers.providers.Web3Provider(p!)
      this.signer = provider.getSigner()
      const r = await axios.post(`${C.HTTP_SERVER}admeta/getContractVersion`)
      const contractAddress = r.data.address
      const abi = r.data.abi
      const c = new ethers.Contract(contractAddress, abi, this.signer);
      this.contract = c.connect(this.signer)
    } catch (err) {
      O.throwException('Please install metamask extension on your PC!', 'metamask')
    }
  }

  async createAd(option: T.CreateAd) {
    const {category, inventory, reward, metadata, title, target} = option
    return await this.contract?.createAd(metadata, title, target, category, inventory, reward, {value: inventory.mul(reward)})
  }

  async initialize(signer: string, categories: BigNumber[]) {
    return await this.contract?.initialize(signer, categories)
  }

  async setSigner(newSigner: string) {
    return await this.contract?.setSigner(newSigner)
  }

  async batchSetCategory(categories: BigNumber[], states: boolean[]) {
    return await this.contract?.batchSetCategory(categories, states)
  }

  async completeAd(adIndex: any, signature: any) {
    return await this.contract?.completeAd(adIndex, signature)
  }

  async getAdInfo(adIndex: BigNumber) {
    return await this.contract?.adInfo(adIndex)
  }

  async getAdLength() {
    return await this.contract?.adLength()
  }

  async matchAd(category: BigNumber, user: string) {
    return await this.contract?.matchAd(category, user)
  }

  async getSigner() {
    return await this.contract?.getSigner()
  }

  async findAdsByPublisher(address: string | undefined) {
    if (!address) return
    return await this.contract?.findAdsByPublisher(address)
  }

  async adLength() {
    return await this.contract?.adLength()
  }

  async setUserLevel(level: BigNumber, score: BigNumber, categoryScore: string, address: string) {
    return await this.contract?.setUserLevel(level, score, categoryScore, address)
  }

  async getUserLevel(address: string) {
    return await this.contract?.getUserLevel(address)
  }
}

export default CallContract
