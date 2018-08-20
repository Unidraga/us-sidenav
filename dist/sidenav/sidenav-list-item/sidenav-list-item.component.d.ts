import { OnInit } from '@angular/core';
import { NavItem } from '../nav-item';
import { ComponentRouteService } from '../../shared/route.service';
export declare class SideNavListItemComponent implements OnInit {
    private componentRouteService;
    expanded: boolean;
    ariaExpanded: boolean;
    item: NavItem;
    depth: number;
    constructor(componentRouteService: ComponentRouteService);
    ngOnInit(): void;
    onItemSelected(item: NavItem): void;
}
