window.global_config = {
    "router": {
        "root": '/',
        "pushState": false
    },
    "modules": [{
        "url": "",
        "controller": "index",
        "showLoading": true
    }, {
        "url": "list",
        "controller": "list",
        "showLoading": true
    }, {
        "url": "detail",
        "controller": "detail",
        "showLoading": false
    }],
    loader: requirejs
}
requirejs.config({
    baseUrl: "js",
    paths: {
        'index': 'views/index',
        'detail': 'views/detail',
        'list': 'views/list'
    }
})
