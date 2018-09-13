let randomstring = require("randomstring");

const generateLightBoxHTML = (url, title) => {
    return '<a href="' + url + '" data-lightbox="' + randomstring() +'" data-title="' + title + '"></a>';
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
                target.replaceWith(generateLightBoxHTML(target.attr('src'), target.attr('alt')));
            });
            page.content = $.html();
            return page;
        }
    }
};