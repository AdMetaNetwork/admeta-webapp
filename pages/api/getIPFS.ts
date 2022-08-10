// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fleekStorage from '@fleekhq/fleek-storage-js'
import { f_api_key, f_api_secret } from '../../config/c.example'

type Data = {
  url: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const key = req.query.key as string
  const myFile = await fleekStorage.get({
    apiKey: f_api_key,
    apiSecret: f_api_secret,
    key,
    getOptions: [
      'publicUrl',
      'hash',
      'key'
    ]
  })
  const url = myFile.publicUrl as string
  res.status(200).json({ url })
}
