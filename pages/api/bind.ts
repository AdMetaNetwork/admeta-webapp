// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import requestIp from 'request-ip'
import { mongo_url } from '../../config/c.example'

const MongoClient = require('mongodb').MongoClient;

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
    const dbo = db.db("database0");
    const myobj = {
      ip: detectedIp,
      'user-agent': req.headers['user-agent'],
      account: req.body.account,
      adurl: req.body.adurl,
      adimg: req.body.adimg
    };
    dbo.collection("userAndAds").insertOne(myobj, function (err: any, res: any) {
      if (err) throw err;
      db.close();
    });
  });

  const name = req.query.name as string
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.status(200).json({ name })
}
