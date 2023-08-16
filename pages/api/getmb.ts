// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import requestIp from 'request-ip'
import { mongo_url } from '../../config/c.example'

const MongoClient = require('mongodb').MongoClient;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const detectedIp = requestIp.getClientIp(req)

	MongoClient.connect(mongo_url, function (err: any, db: any) {
		if (err) throw err
		const dbo = db.db('database0');
		const ua = req.headers['user-agent']
		const whereStr = {'user-agent': ua}; // 查询条件
		dbo
			.collection('userAndAds')
			.find(whereStr)
			.toArray(async function (err: any, result: any) {
				// 返回集合中所有数据
				if (err) throw err

				res.setHeader('Access-Control-Allow-Origin', '*')
        console.log(result, 'result---->>>')
				if (result.length) {
          res
						.status(200)
						.json({
							ad: {
								adurl: result[result.length - 1].adurl,
								adimg: result[result.length - 1].adimg
							}
						})
				} else {
					res
						.status(200)
						.json({
							ad: {
								adurl: 'https://admeta.network',
								adimg:
									'https://storageapi.fleek.co/038f3525-c411-4ef9-86e4-bc833d0c2d7f-bucket/banner2.png'
							}
						})
				}

				db.close()
			})
	})
}
