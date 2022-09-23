// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import requestIp from 'request-ip'
import { mongo_url } from '../../config/c'
var MongoClient = require('mongodb').MongoClient;

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const detectedIp = requestIp.getClientIp(req)

  MongoClient.connect(mongo_url, function (err: any, db: any) {
    if (err) throw err;
    var dbo = db.db("database0");
    console.log(dbo)
    var myobj = { ip: detectedIp, 'user-agent': req.headers['user-agent'], account: req.body.account, adurl: req.body.adurl, adimg: req.body.adimg };
    dbo.collection("userAndAds").insertOne(myobj, function (err: any, res: any) {
      if (err) throw err;
      console.log("文档插入成功");
      console.log(res)
      db.close();
    });
  });

  console.log(detectedIp)
  console.log('req--->>>', req.headers['user-agent'])
  const name = req.query.name as string
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.status(200).json({ name })
}
