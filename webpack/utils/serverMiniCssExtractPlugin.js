const MiniCssExtractPlugin = require('mini-css-extract-plugin');

class ServerMiniCssExtractPlugin extends MiniCssExtractPlugin {
  getCssChunkObject() {
    return {};
  }
}

module.exports = ServerMiniCssExtractPlugin;
