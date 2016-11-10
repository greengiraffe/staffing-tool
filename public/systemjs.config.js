// map tells the System loader where to look for things
let map = {
    'app': 'js/app', // 'dist',
    'rxjs': 'js/vendor/rxjs',
    '@angular': 'js/vendor/@angular'
};

// packages tells the System loader how to load when no filename and/or no extension
let packages = {
    'app': {main: 'boot.js', defaultExtension: 'js'},
    'rxjs': {defaultExtension: 'js'}
};

let packageNames = [
    '@angular/common',
    '@angular/compiler',
    '@angular/core',
    '@angular/http',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    '@angular/router',
    '@angular/testing',
    '@angular/upgrade'
];

// add package entries for angular packages in the form '@angular/common': { main: 'index.js', defaultExtension: 'js' }
packageNames.forEach(function (pkgName) {
    packages[pkgName] = {main: 'index.js', defaultExtension: 'js'};
});

let config = {
    map: map,
    packages: packages
};

System.config(config);
