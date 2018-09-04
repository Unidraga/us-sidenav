import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { SideNavComponent } from './sidenav/sidenav.component';
import { SideNavListItemComponent } from './sidenav/sidenav-list-item/sidenav-list-item.component';
import { MaterialModule } from './material.module';
import { FormDirective } from './shared/form.directive';
import { SideNavConfig } from './sidenav/sidenav-config';
var routes = [
    { path: '', component: SideNavComponent }
];
var SideNavModule = /** @class */ (function () {
    function SideNavModule() {
    }
    SideNavModule.forRoot = function (routes) {
        return {
            ngModule: SideNavModule,
            providers: [{ provide: SideNavConfig, useValue: routes }]
        };
    };
    SideNavModule.forChild = function (routes) {
        return {
            ngModule: SideNavModule,
            providers: [{ provide: SideNavConfig, useValue: routes }]
        };
    };
    SideNavModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        FormsModule,
                        ReactiveFormsModule,
                        MaterialModule,
                        BrowserAnimationsModule,
                        RouterModule.forRoot(routes)
                    ],
                    providers: [],
                    declarations: [
                        SideNavComponent,
                        SideNavListItemComponent,
                        FormDirective
                    ],
                    exports: [
                        SideNavComponent
                    ]
                },] },
    ];
    /** @nocollapse */
    SideNavModule.ctorParameters = function () { return []; };
    return SideNavModule;
}());
export { SideNavModule };
//# sourceMappingURL=sidenav.module.js.map