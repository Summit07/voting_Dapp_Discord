/** @type {import('next').NextConfig} */

require("dotenv").config({ path: "path/to/.env.local" });
const webpack = require("webpack");

const nextConfig = {
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ],
};

module.exports = nextConfig;
