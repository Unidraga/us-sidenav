import { NgModule } from '@angular/core';
import { MatSidenavModule, MatListModule, MatIconModule} from '@angular/material';

@NgModule({
    imports: [MatSidenavModule, MatListModule, MatIconModule],
    exports: [MatSidenavModule, MatListModule, MatIconModule],
})
export class MaterialModule { }
