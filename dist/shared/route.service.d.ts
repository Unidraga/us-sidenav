import { Type } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NavItem } from '../sidenav/nav-item';
export declare class ComponentRouteService {
    private componentSource;
    private navSource;
    componentObservable$: Observable<Type<any>>;
    navObservable$: Observable<NavItem>;
    updateComponent(component: Type<any>): void;
    updateNavItem(item: NavItem): void;
    updateNavItemAndComponent(item: NavItem): void;
}
