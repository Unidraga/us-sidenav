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
      '@angular/core': 'ng.core',
      '@angular/router': 'ng.router',
      '@angular/forms': 'ng.forms',
      '@angular/material': 'ng.material'
    },
  },
  external: [
    'rxjs/Subject',
    '@angular/core',
    '@angular/common',
    '@angular/router',
    '@angular/forms',
    '@angular/material'
  ]  
};
