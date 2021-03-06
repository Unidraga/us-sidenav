import {Component, HostBinding, Input, OnInit, EventEmitter, Output, Type, OnDestroy} from '@angular/core';
import {NavItem} from '../nav-item';
// import {NavService} from '../nav.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { ComponentRouteService } from '../../shared/route.service';

@Component({
  selector: 'us-sidenav-list-item',
  templateUrl: './sidenav-list-item.component.html',
  styleUrls: ['./sidenav-list-item.component.less'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class SideNavListItemComponent implements OnInit {
  expanded = true;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: NavItem;
  @Input() depth: number;
  // subscription: Subscription;
  // selectedNav: NavItem;

  constructor(
    private componentRouteService: ComponentRouteService) {
  }

  ngOnInit() {
    if (this.depth === undefined) {
      this.depth = 0;
    }

    // this.componentRouteService.navObservable$.subscribe(
    //   (nav: any) => {
    //     this.selectedNav = nav;
    //   });
  }

  // isSelected(): boolean {
  //   return this.item === this.selectedNav;
  // }

  onItemSelected(item: NavItem) {
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
  }
}
