// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {
  randomAsNumber,
} from '@polkadot/util-crypto'


type Data = {
  v: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.status(200).json({ v: randomAsNumber()+'' })
}
