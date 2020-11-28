const CopyWebpackPlugin = require('copy-webpack-plugin');
const yaml = require('js-yaml');

module.exports = function (config) {
  config.plugins.push(new CopyWebpackPlugin({
    patterns: [
      {
        from: 'data/resume.yaml',
        to: 'resume.json',
        transform: (content) => {
          return Buffer.from(
            JSON.stringify(
              yaml.safeLoad(content.toString('utf8'), { schema: yaml.JSON_SCHEMA })
            ),
            'utf8'
          )
        }
      },
    ]
  }, {
    copyUnmodified: true
  }));
  return config;
}
