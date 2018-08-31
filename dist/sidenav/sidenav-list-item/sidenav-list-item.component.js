import { Component, HostBinding, Input } from '@angular/core';
import { NavItem } from '../nav-item';
// import {NavService} from '../nav.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ComponentRouteService } from '../../shared/route.service';
var SideNavListItemComponent = /** @class */ (function () {
    // subscription: Subscription;
    function SideNavListItemComponent(componentRouteService) {
        this.componentRouteService = componentRouteService;
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
                    template: "\n    <mat-list-item [ngStyle]=\"{'padding-left': (depth * 1.5) + 'em'}\" (click)=\"onItemSelected(item)\"\n                  [ngClass]=\"{'active': item.route ? router.isActive(item.route, true): false, 'expanded': expanded}\">\n      <mat-icon class=\"routeIcon\"><small>{{item.iconName}}</small></mat-icon>\n      {{item.displayName}}\n      <span fxFlex *ngIf=\"item.children && item.children.length\">\n        <span fxFlex></span>\n        <mat-icon [@indicatorRotate]=\"expanded\"> \n          <!-- \"expanded ? 'expanded': 'collapsed'\"> -->\n          expand_more\n        </mat-icon>\n      </span>\n    </mat-list-item>\n    <div *ngIf=\"expanded\">\n      <us-sidenav-list-item *ngFor=\"let child of item.children\" [item]=\"child\" [depth]=\"depth+1\">\n      </us-sidenav-list-item>\n    </div>\n  ",
                    styles: ["\n    :host {\n      display: block;\n      outline: none;\n    }\n    .mat-list-item {\n      padding: 8px 0;\n    }\n    .mat-list-item .routeIcon {\n      margin-right: 40px;\n    }\n  "],
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
        { type: ComponentRouteService }
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