import { SideNavConfig } from './sidenav/sidenav-config';
export declare class SideNavModule {
    static forRoot(config: SideNavConfig): {
        ngModule: typeof SideNavConfig;
        providers: {
            provide: typeof SideNavConfig;
            useValue: SideNavConfig;
        }[];
    };
}
