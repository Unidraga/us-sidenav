import { Injectable, Type } from '@angular/core';
import { Subject } from 'rxjs/Subject';
// import { Observable } from 'rxjs/Observable';
import { NavItem } from '../sidenav/nav-item';

@Injectable()
export class ComponentRouteService {

    // Observable string sources
    private componentSource = new Subject<Type<any>>();
    private navSource = new Subject<NavItem>();

    // Observable string streams
    componentObservable$ = this.componentSource.asObservable();
    navObservable$ = this.navSource.asObservable();

    // Service message commands
    updateComponent(component: Type<any>) {
        this.componentSource.next(component);
    }

    updateNavItem(item: NavItem) {
        this.navSource.next(item);
    }

    updateNavItemAndComponent(item: NavItem) {
        this.navSource.next(item);
        this.componentSource.next(item.component);
    }
}
