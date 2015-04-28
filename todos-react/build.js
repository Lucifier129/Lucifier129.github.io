({
    appDir: "./dev",
    baseUrl: "js",
    dir: "./dest",
    paths: {
        'react': '../lib/react.min',
    },
    modules: [
        //First set up the common build layer.
        {
            //module names are relative to baseUrl
            name: 'app'
        }
    ]
})