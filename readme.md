# wext-manifest-webpack-plugin [![npm version](https://img.shields.io/npm/v/wext-manifest-webpack-plugin)](https://www.npmjs.com/package/wext-manifest-webpack-plugin)

> wext-manifest-webpack-plugin

Webpack plugin to solve the problem of generating js file for manifest.json entry

<h3>🙋‍♂️ Made by <a href="https://twitter.com/_abhijithv">@abhijithvijayan</a></h3>
<p>
  Donate:
  <a href="https://www.paypal.me/iamabhijithvijayan" target='_blank'><i><b>PayPal</b></i></a>,
  <a href="https://www.patreon.com/abhijithvijayan" target='_blank'><i><b>Patreon</b></i></a>
</p>
<p>
  <a href='https://www.buymeacoffee.com/abhijithvijayan' target='_blank'>
    <img height='36' style='border:0px;height:36px;' src='https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/custom_images/orange_img.png' border='0' alt='Buy Me a Coffee' />
  </a>
</p>
<hr />

## How it works
It just find js files from manifest entry and remove the js file from the compilation.

### Looking for Web Extension starter?

Checkout [web-extension-starter](https://github.com/abhijithvijayan/web-extension-starter) that uses this 

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

## Show your support

Give a ⭐️ if this project helped you!

## License

MIT © [Abhijith Vijayan](https://abhijithvijayan.in)
