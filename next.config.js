/* eslint-disable @typescript-eslint/no-var-requires */

/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    dirs: ['src'],
  },
  reactStrictMode: true,

  // add domain whitelist
  images: {
    domains: [
      'res.cloudinary.com',
      'images.unsplash.com'
    ],
  },
};