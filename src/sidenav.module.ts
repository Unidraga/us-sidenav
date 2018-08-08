import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { SideNavComponent } from './sidenav/sidenav.component';
import { SideNavListItemComponent } from './sidenav/sidenav-list-item/sidenav-list-item.component';
import { MaterialModule } from './material.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
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
        SideNavListItemComponent
        // RolesComponent,
        // ListComponent,
        // AddEditViewComponent,
        // DeleteComponent
    ]
})
export class SideNavModule { }
