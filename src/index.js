let cheerio = require('cheerio');
const uuid = require('uuid/v4');

const generateLightBoxHTML = (img) => {
    return '<a href="' + img.attr('src') + '" data-lightbox="' + uuid() +'" data-title="' + img.attr('alt') + '">' + img + '</a>';
};

const getAssets = function () {
    // let config = this.config.get('pluginsConfig.lightbox');
    // if (config.hasOwnProperty('jquery') && config['jquery'] === false) {
    //     assets['js'] = ['jquery.min.js'].concat(assets['js'])
    // }
    return {
        assets: './dist/assets',
        js: [
            'jquery.min.js',
            'lightbox.min.js'
        ],
        css: [
            'lightbox.min.css',
        ]
    };
};

module.exports = {
    book: getAssets(),
    hooks: {
        page: function (page) {
            let $ = cheerio.load(page.content);
            $('img').each(function (index, img) {
                let target = $(img);
                target.replaceWith(generateLightBoxHTML(target));
            });
            page.content = $.html();
            return page;
        }
    }
};