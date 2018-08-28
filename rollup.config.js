export default {
  input: 'dist/us-sidenav.js',
  output: {
    name: 'usSidenav',
    file: 'dist/us-sidenav.umd.js',
    format: 'umd',
    sourceMap: false,
    globals: {
      'rxjs/Subject': 'Rx.Subject',
      '@angular/common': 'ng.common',
      '@angular/common/http': 'ng.common.http',
      '@angular/core': 'ng.core',
      '@angular/forms': 'ng.forms',
      '@angular/material': 'ng.material',
      '@angular/animations': 'ng.animations',
      '@angular/platform-browser/animations': 'ng.platform-browser.animations'
    },
  },
  external: [
    'rxjs/Subject',
    '@angular/common',
    '@angular/common/http',
    '@angular/core',
    '@angular/router',
    '@angular/forms',
    '@angular/material',
    '@angular/animations',
    '@angular/platform-browser/animations'
  ]  
};
