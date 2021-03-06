const withTM = require('next-transpile-modules')(['@polkadot/react-identicon'])

/** @type {import('next').NextConfig} */
module.exports = withTM({
  reactStrictMode: true,
  images: {
    domains: ['storageapi.fleek.co', 'ipfs.fleek.co', 'fenglin-1256754106.cos.ap-nanjing.myqcloud.com'],
  },
})
