import { ModuleWithProviders } from '@angular/core';
import { Route } from '@angular/router';
export declare class SideNavModule {
    static forRoot(routes: Route[]): ModuleWithProviders<SideNavModule>;
    static forChild(routes: Route[]): ModuleWithProviders<SideNavModule>;
}
