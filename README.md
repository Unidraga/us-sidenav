# UsSidenav

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.1.

Build a workflow diagram using us-workflow project before importing this component into your project.

## Features / Status

- Setup us-workflow project before using this
- use <us-sidenav name="workflowName"></us-sidenav> in your project to render the sidenav
- bind the components specified in the sidenav to the components of your project in yourapp.module.ts, e.g,
const workforceRoutes = [
  {
    path: 'Applicable Conditions',
    component: ApplicableConditionsComponent
  },
  {
    path: 'Guidance',
    component: GuidanceComponent
  }
];

@NgModule({
  imports: [
    SideNavModule.forRoot(workforceRoutes),
  ],
})
where 'path' is the name in your sidenav

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

TODO:
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

TODO:
Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
