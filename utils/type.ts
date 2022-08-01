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