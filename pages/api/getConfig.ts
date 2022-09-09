// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { DataConfig } from '../../utils/type'
import Domain from '../../config/domain'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<DataConfig>
) {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.status(200).json(Domain)
}
