import $ from "jquery";
let randomstring = require("randomstring");

const generateLightBoxHTML = (url, title) => {
    return '<a href="' + url + '" data-lightbox="' + randomstring() +'" data-title="' + title + '"></a>';
};

const getAssets = function () {
    let assets = {
        assets: './assets',
        js: [
            'lightbox.min.js'
        ],
        css: [
            'lightbox.min.css',
        ]
    };
    let config = this.config.get('pluginsConfig.lightbox');
    if (config.hasOwnProperty('jquery') && config['jquery'] === false) {
        assets['js'] = ['jquery.min.js'].concat(assets['js'])
    }
    return assets;
};

module.exports = {
    book: getAssets(),
    hooks: {
        page: function (page) {
            let content = $(page.content);
            content.find('img').each(function (index, img) {
                let target = $(img);
                target.replaceWith(generateLightBoxHTML(target.attr('src'), target.attr('alt')));
            });
            page.content = content.html();
            return page;
        }
    }
};