const cheerio = require('cheerio');
const uuid = require('uuid/v4');
let pageUuid = 0;

let lightboxConfig = {};

const generateLightBoxByElement = (img) => {
  let imgUuid = pageUuid;
  if (lightboxConfig.sameUuid !== true) {
    imgUuid = uuid();
  }
  return generateLightBoxItem(img.attr('src'), imgUuid, img.attr('alt'))
};

const generateLightBoxItem = (url, groupName, title) => `<a href="${url}" data-lightbox="${groupName}" data-title="${title}"><img src="${url}" alt="${title}"></a>`;

const getAssets = () => {
  const assets = {
    assets: './dist/assets',
    js: [
      'js/lightbox.min.js',
    ],
    css: [
      'css/lightbox.min.css',
    ],
  };
  if (Object.prototype.hasOwnProperty.call(lightboxConfig, 'includeJquery') && lightboxConfig.includeJquery !== false) {
    assets.js.push('js/jquery.slim.min.js');
  }
  return assets;
};

const generateLightboxConfigScript = () => {
  if (!Object.prototype.hasOwnProperty.call(lightboxConfig, 'options')) {
    return '';
  }
  return `<script>document.addEventListener("DOMContentLoaded", function() {lightbox.option(${JSON.stringify(lightboxConfig.options)});})</script>`;

};

module.exports = {
  book: getAssets(),
  blocks: {
    lightbox: {
      process: function(block) {
        const arg = {
          url: block.kwargs.url,
          groupName: block.kwargs.groupName || lightboxConfig.sameUuid !== true ? uuid() : pageUuid,
          title: block.kwargs.title || "Image",
        };
        return generateLightBoxItem(arg.url, arg.groupName, arg.title);
      }
    }
  },
  hooks: {
    init() {
      lightboxConfig = this.config.get('pluginsConfig.lightbox');
      if (!Object.prototype.hasOwnProperty.call(lightboxConfig, 'sameUuid')) {
        lightboxConfig.sameUuid = false;
      }
    },
    page(page) {
      const $ = cheerio.load(page.content);
      pageUuid = uuid();
      $('img').each((index, img) => {
        const target = $(img);
        target.replaceWith(generateLightBoxByElement(target));
      });
      page.content = $('body').html();
      page.content += generateLightboxConfigScript();
      return page;
    },
  },
};
