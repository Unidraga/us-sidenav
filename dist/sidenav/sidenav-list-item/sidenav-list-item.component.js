import { Component, HostBinding, Input } from '@angular/core';
import { NavItem } from '../nav-item';
import { Router } from '@angular/router';
// import {NavService} from '../nav.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ComponentRouteService } from '../../shared/route.service';
var SideNavListItemComponent = /** @class */ (function () {
    // subscription: Subscription;
    function SideNavListItemComponent(componentRouteService, router) {
        this.componentRouteService = componentRouteService;
        this.router = router;
        this.ariaExpanded = this.expanded;
    }
    SideNavListItemComponent.prototype.ngOnInit = function () {
        if (this.depth === undefined) {
            this.depth = 0;
        }
    };
    SideNavListItemComponent.prototype.onItemSelected = function (item) {
        console.log(item);
        if (!item.children || !item.children.length) {
            console.log(item.component);
            this.componentRouteService.updateNavItemAndComponent(item);
            // this.componentRouteService.updateNavItem(item);
            // this.componentRouteService.updateComponent(item.component);
            // this.router.navigate([item.route]);
            // this.navService.closeNav();
        }
        if (item.children && item.children.length) {
            this.expanded = !this.expanded;
        }
    };
    SideNavListItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'us-sidenav-list-item',
                    templateUrl: './sidenav-list-item.component.html',
                    styleUrls: ['./sidenav-list-item.component.less'],
                    animations: [
                        trigger('indicatorRotate', [
                            state('collapsed', style({ transform: 'rotate(0deg)' })),
                            state('expanded', style({ transform: 'rotate(180deg)' })),
                            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4,0.0,0.2,1)')),
                        ])
                    ]
                },] },
    ];
    /** @nocollapse */
    SideNavListItemComponent.ctorParameters = function () { return [
        { type: ComponentRouteService },
        { type: Router }
    ]; };
    SideNavListItemComponent.propDecorators = {
        ariaExpanded: [{ type: HostBinding, args: ['attr.aria-expanded',] }],
        item: [{ type: Input }],
        depth: [{ type: Input }]
    };
    return SideNavListItemComponent;
}());
export { SideNavListItemComponent };
//# sourceMappingURL=sidenav-list-item.component.js.map