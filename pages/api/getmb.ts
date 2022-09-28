// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import requestIp from 'request-ip'
import { hexToString } from '@polkadot/util'
import { mongo_url } from '../../config/c.example'
var MongoClient = require('mongodb').MongoClient

function formatData(c: any[]) {
	let arr: any[] = []
	c.forEach(item => {
		arr.push(item[1])
	})
	arr.forEach(item => {
		item = item.toString()
	})

	let a: any[] = JSON.parse(`[${arr.toString()}]`)
	console.log(a)
	a.forEach(item => {
		item.target = hexToString(item.target)
		item.metadata = hexToString(item.metadata)
	})
	let obj = {
		adurl: a[a.length - 1].target,
		adimg: a[a.length - 1].metadata
	}

	return obj
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const detectedIp = requestIp.getClientIp(req)

	MongoClient.connect(mongo_url, function (err: any, db: any) {
		if (err) throw err
		var dbo = db.db('database0')
		const ua = req.headers['user-agent']
    console.log(detectedIp, ua, '=============-============')
		var whereStr = { 'user-agent': ua } // 查询条件
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
