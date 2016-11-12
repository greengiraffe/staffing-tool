
// map tells the System loader where to look for things
let paths = {
    'npm:': 'js/vendor/'
};

let map = {
    'app':  'js/app',
    'rxjs': 'js/vendor/rxjs',

    '@angular/core': 'npm:@angular/core/bundles/core.umd.min.js',
    '@angular/common': 'npm:@angular/common/bundles/common.umd.min.js',
    '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.min.js',
    '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.min.js',
    '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.min.js',
    '@angular/http': 'npm:@angular/http/bundles/http.umd.min.js',
    '@angular/router': 'npm:@angular/router/bundles/router.umd.min.js',
    '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.min.js'
};


// packages tells the System loader how to load when no filename and/or no extension
let packages = {
    'app': {main: 'boot.js', defaultExtension: 'js'},
    'rxjs': {defaultExtension: 'js'}
};


let config = {
    map: map,
    packages: packages,
    paths: paths
};

System.config(config);

