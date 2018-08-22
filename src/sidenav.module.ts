import { ModuleWithProviders, NgModule, ValueProvider } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Route } from '@angular/router';
import { SideNavComponent } from './sidenav/sidenav.component';
import { SideNavListItemComponent } from './sidenav/sidenav-list-item/sidenav-list-item.component';
import { MaterialModule } from './material.module';
import { FormDirective } from './shared/form.directive';
import { SideNavConfig } from './sidenav/sidenav-config';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule
    // RouterModule.forChild(rolesRoutes)
  ],
  providers: [
    // RolesDataResolverService,
    // DeleteConfirmerService
  ],
  declarations: [
    SideNavComponent,
    SideNavListItemComponent,
    FormDirective
    // RolesComponent,
    // ListComponent,
    // AddEditViewComponent,
    // DeleteComponent
  ],
  exports: [
    SideNavComponent
  ]
})
export class SideNavModule {
  static forRoot(routes: Route[]): ModuleWithProviders<SideNavModule> {
    return {
      ngModule: SideNavModule,
      providers: [{provide: SideNavConfig, useValue: routes}]
    };
  }

  static forChild(routes: Route[]): ModuleWithProviders<SideNavModule> {
    return {
      ngModule: SideNavModule,
      providers: [{provide: SideNavConfig, useValue: routes}]
    };
  }
}
