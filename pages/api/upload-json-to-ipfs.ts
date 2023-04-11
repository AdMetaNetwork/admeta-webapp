// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fleekStorage from '@fleekhq/fleek-storage-js'
import { f_api_key, f_api_secret } from '../../config/c.example'

type Data = {
  ipfsHash: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | string>
) {
  const key = req.body.key
  const jsonString = JSON.stringify(req.body.jsonContent);
  const fileBuffer = Buffer.from(jsonString, 'utf-8');

  fleekStorage.upload({
    apiKey: f_api_key,
    apiSecret: f_api_secret,
    key,
    data: fileBuffer,
  }).then((v) => {
    res.status(200).json({ipfsHash: v.hash})
  }).catch(e => {
    res.status(500).json('server error')
  })
}
