import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideNavComponent } from './sidenav/sidenav.component';
import { SideNavListItemComponent } from './sidenav/sidenav-list-item/sidenav-list-item.component';
import { MaterialModule } from './material.module';
import { FormDirective } from './shared/form.directive';
import { SideNavConfig } from './sidenav/sidenav-config';
var SideNavModule = /** @class */ (function () {
    function SideNavModule() {
    }
    SideNavModule.forRoot = function (config) {
        return {
            ngModule: SideNavConfig,
            providers: [{ provide: SideNavConfig, useValue: config }]
        };
    };
    SideNavModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        MaterialModule,
                        BrowserAnimationsModule
                        // RouterModule.forChild(rolesRoutes)
                    ],
                    providers: [],
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
                },] },
    ];
    return SideNavModule;
}());
export { SideNavModule };
//# sourceMappingURL=sidenav.module.js.map