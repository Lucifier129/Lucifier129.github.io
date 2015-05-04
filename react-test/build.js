({
    appDir: "./dev",
    baseUrl: "js",
    dir: "./dest",
    paths: {
        'react': '../lib/react.min',
        'react-canvas': '../lib/react-canvas'
    },
    modules: [
        //First set up the common build layer.
        {
            //module names are relative to baseUrl
            name: 'listview/app'
        },
        {
            name: 'c_listview/app'
        },
        {
            name: 'router'
        }
    ]
})