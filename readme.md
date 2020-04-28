<h1 align="center">wext-manifest-webpack-plugin</h1>
<p align="center">Webpack plugin to solve the problem of generating js file for manifest.json entry</p>
<div align="center">
  <a href="https://www.npmjs.com/package/wext-manifest-webpack-plugin">
    <img src="https://img.shields.io/npm/v/wext-manifest-webpack-plugin" alt="NPM" />
  </a>
  <a href="https://travis-ci.org/abhijithvijayan/wext-manifest-webpack-plugin">
    <img src="https://travis-ci.org/abhijithvijayan/wext-manifest-webpack-plugin.svg?branch=master" alt="Travis Build" />
  </a>
  </a>
  <a href="https://david-dm.org/abhijithvijayan/wext-manifest-webpack-plugin">
    <img src="https://img.shields.io/david/abhijithvijayan/wext-manifest-webpack-plugin.svg?colorB=orange" alt="DEPENDENCIES" />
  </a>
  <a href="https://github.com/abhijithvijayan/wext-manifest-webpack-plugin/blob/master/license">
    <img src="https://img.shields.io/github/license/abhijithvijayan/wext-manifest-webpack-plugin.svg" alt="LICENSE" />
  </a>
  <a href="https://twitter.com/intent/tweet?text=Check%20out%20wext-manifest-webpack-plugin%21%20by%20%40_abhijithv%0A%0AWebpack%20plugin%20to%20solve%20the%20problem%20of%20generating%20js%20file%20for%20manifest.json%20entry%0Ahttps%3A%2F%2Fgithub.com%2Fabhijithvijayan%2Fwext-manifest-webpack-plugin%0A%0A%23webpack%20%23manifest%20%23webextension%20%23plugin">
     <img src="https://img.shields.io/twitter/url/http/shields.io.svg?style=social" alt="TWEET" />
  </a>
</div>
<h3 align="center">🙋‍♂️ Made by <a href="https://twitter.com/_abhijithv">@abhijithvijayan</a></h3>
<p align="center">
  Donate:
  <a href="https://www.paypal.me/iamabhijithvijayan" target='_blank'><i><b>PayPal</b></i></a>,
  <a href="https://www.patreon.com/abhijithvijayan" target='_blank'><i><b>Patreon</b></i></a>
</p>
<p align="center">
  <a href='https://www.buymeacoffee.com/abhijithvijayan' target='_blank'>
    <img height='36' style='border:0px;height:36px;' src='https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/custom_images/orange_img.png' border='0' alt='Buy Me a Coffee' />
  </a>
</p>
<hr />

❤️ it? ⭐️ it on [GitHub](https://github.com/abhijithvijayan/wext-manifest-webpack-plugin/stargazers) or [Tweet](https://twitter.com/intent/tweet?text=Check%20out%20wext-manifest-webpack-plugin%21%20by%20%40_abhijithv%0A%0AWebpack%20plugin%20to%20solve%20the%20problem%20of%20generating%20js%20file%20for%20manifest.json%20entry%0Ahttps%3A%2F%2Fgithub.com%2Fabhijithvijayan%2Fwext-manifest-webpack-plugin%0A%0A%23webpack%20%23manifest%20%23webextension%20%23plugin) about it.

## Table of Contents

- [How it works](#how-it-works)
- [Installation](#installation)
- [Usage](#usage)
- [Issues](#issues)
  - [🐛 Bugs](#-bugs)
- [Linting & TypeScript Config](#linting-&-typescript-config)
- [LICENSE](#license)

## How it works

It just find js files from manifest entry and remove the js file from the compilation.

### Looking for Web Extension starter

Checkout [web-extension-starter](https://github.com/abhijithvijayan/web-extension-starter) that uses this plugin

## Installation

```sh
# npm
npm install --save-dev wext-manifest-webpack-plugin

# yarn
yarn add wext-manifest-webpack-plugin --dev
```

## Usage

```js
// ... other plugins
const WextManifestWebpackPlugin = require("wext-manifest-webpack-plugin");

module.exports = {
    entry: {
        manifest: './source/manifest.json',
        // ...
    },

    output: {
        path: path.join(destPath, targetBrowser),
        filename: 'js/[name].js',
    },

    module: {
        rules: [
            {
                type: 'javascript/auto', // prevent webpack handling json with its own loaders,
                test: /manifest\.json$/,
                use: 'wext-manifest-loader',
                exclude: /node_modules/,
            },
        ]
    },

    plugins: [
        new WextManifestWebpackPlugin(),
        // ...
    ],
};
```

## Issues

_Looking to contribute? Look for the [Good First Issue](https://github.com/abhijithvijayan/wext-manifest-webpack-plugin/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc+label%3A%22good+first+issue%22)
label._

### 🐛 Bugs

Please file an issue [here](https://github.com/abhijithvijayan/wext-manifest-webpack-plugin/issues/new) for bugs, missing documentation, or unexpected behavior.

[**See Bugs**](https://github.com/abhijithvijayan/wext-manifest-webpack-plugin/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc+label%3A%22type%3A+bug%22)

## Linting & TypeScript Config

- Shared Eslint & Prettier Configuration - [`@abhijithvijayan/eslint-config`](https://www.npmjs.com/package/@abhijithvijayan/eslint-config)
- Shared TypeScript Configuration - [`@abhijithvijayan/tsconfig`](https://www.npmjs.com/package/@abhijithvijayan/tsconfig)

## License

MIT © [Abhijith Vijayan](https://abhijithvijayan.in)
