import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
var ComponentRouteService = /** @class */ (function () {
    function ComponentRouteService() {
        // Observable string sources
        this.componentSource = new Subject();
        this.navSource = new Subject();
        // Observable string streams
        this.componentObservable$ = this.componentSource.asObservable();
        this.navObservable$ = this.navSource.asObservable();
    }
    // Service message commands
    ComponentRouteService.prototype.updateComponent = function (component) {
        this.componentSource.next(component);
    };
    ComponentRouteService.prototype.updateNavItem = function (item) {
        this.navSource.next(item);
    };
    ComponentRouteService.prototype.updateNavItemAndComponent = function (item) {
        this.navSource.next(item);
        this.componentSource.next(item.component);
    };
    ComponentRouteService.decorators = [
        { type: Injectable },
    ];
    return ComponentRouteService;
}());
export { ComponentRouteService };
//# sourceMappingURL=route.service.js.map