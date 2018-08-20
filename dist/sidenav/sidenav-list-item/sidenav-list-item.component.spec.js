import { async, TestBed } from '@angular/core/testing';
import { SideNavListItemComponent } from './sidenav-list-item.component';
describe('SideNavListItemComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [SideNavListItemComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(SideNavListItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should be created', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=sidenav-list-item.component.spec.js.map