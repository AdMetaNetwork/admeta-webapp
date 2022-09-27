export type Meta = {
  genesisHash: string
  name: string
  source: string
}

export type Wallet = {
  address: string,
  meta: Meta,
  type: string
}

// select option
export type AddressMap = {
  value: string,
  label: string
}

export type Status = 'idle' | 'loading' | 'success' | 'error';


export type AdInfo = {
  amount: number,
  bond?: number,
  cpi: number,
  endBlock: number,
  approved?: boolean,
  metadata: string,
  target: string,
  title: string,
  preference: any,
  proposer?: string
}

export type IMessage<T> = {
  type: string;
  data: T;
};

export type Domain = {
  name: string,
  domain: string,
  category: string[]
}

export type DataConfig = {
  searching_engines: string[],
  categories: string[],
  products: Domain[]
}

export type ModalType = 'Wallet' | 'Domain'