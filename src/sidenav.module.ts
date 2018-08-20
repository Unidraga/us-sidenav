import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { SideNavComponent } from './sidenav/sidenav.component';
import { SideNavListItemComponent } from './sidenav/sidenav-list-item/sidenav-list-item.component';
import { MaterialModule } from './material.module';
import { FormDirective } from './shared/form.directive';

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
export class SideNavModule { }
