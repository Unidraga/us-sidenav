import { OnInit } from '@angular/core';
import { NavItem } from '../nav-item';
import { Router } from '@angular/router';
import { ComponentRouteService } from '../../shared/route.service';
export declare class SideNavListItemComponent implements OnInit {
    private componentRouteService;
    router: Router;
    expanded: boolean;
    ariaExpanded: boolean;
    item: NavItem;
    depth: number;
    constructor(componentRouteService: ComponentRouteService, router: Router);
    ngOnInit(): void;
    onItemSelected(item: NavItem): void;
}
