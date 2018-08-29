import { ModuleWithProviders } from '@angular/core';
import { Route } from '@angular/router';
export declare class SideNavModule {
    static forRoot(routes: Route[]): ModuleWithProviders;
    static forChild(routes: Route[]): ModuleWithProviders;
}
