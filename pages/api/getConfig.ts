// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import { DataConfig } from '../../utils/type'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<DataConfig>
) {
	const config = await axios.get(
		'https://raw.githubusercontent.com/AdMetaNetwork/web3-product-categorized-list/main/web3-product-list.json'
	)
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.status(200).json(config.data)
}
