/**
 */
var rootPath = "/" + location.pathname.split("/")[1] + '/' + location.pathname.split("/")[2];
//require.js config
require({
    //baseUrl: "/" + location.pathname.split("/")[1],
    parseOnLad: true,
    paths: {
        "js": "/js",
        "text": "/js/text",
        'template': '/js/template',
        "view": "/view",
        "Header":"/view/header/Header",
        'footer':"/view/footer/footer"
    },
    shim: {
        'template': {
            exports: 'template'
        }
    }
});