"use strict";

var _jquery = _interopRequireDefault(require("jquery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var randomstring = require("randomstring");

var generateLightBoxHTML = function generateLightBoxHTML(url, title) {
  return '<a href="' + url + '" data-lightbox="' + randomstring() + '" data-title="' + title + '"></a>';
};

var getAssets = function getAssets() {
  // let config = this.config.get('pluginsConfig.lightbox');
  // if (config.hasOwnProperty('jquery') && config['jquery'] === false) {
  //     assets['js'] = ['jquery.min.js'].concat(assets['js'])
  // }
  return {
    assets: './dist/assets',
    js: ['jquery.min.js', 'lightbox.min.js'],
    css: ['lightbox.min.css']
  };
};

module.exports = {
  book: getAssets(),
  hooks: {
    page: function page(_page) {
      var content = (0, _jquery.default)(_page.content);
      content.find('img').each(function (index, img) {
        var target = (0, _jquery.default)(img);
        target.replaceWith(generateLightBoxHTML(target.attr('src'), target.attr('alt')));
      });
      _page.content = content.html();
      return _page;
    }
  }
};