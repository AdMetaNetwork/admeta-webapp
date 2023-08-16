import { ethers, BigNumber } from 'ethers'
import detectEthereumProvider from "@metamask/detect-provider";
import { abi } from "./abi";
import * as C from '../config/constant'
import * as T from './type'
import * as O from './tools'

class CallContract {
  private signer: ethers.providers.JsonRpcSigner | undefined
  contract: ethers.Contract | undefined
  contractAddress: string

  constructor() {
    this.contractAddress = C.CONTRACT_ADDRESS
  }

  async init() {
    try {
      const p = await detectEthereumProvider()
      const provider = new ethers.providers.Web3Provider(p!)
      this.signer = provider.getSigner()
      const c = new ethers.Contract(this.contractAddress, abi, this.signer);
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

  async completeAd(adIndex: BigNumber, signature: any) {
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
}

export default CallContract
