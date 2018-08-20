import { Type } from '@angular/core';
export declare class NavItem {
    displayName: string | undefined;
    disabled?: boolean;
    iconName?: 'brightness_1' | 'edit' | 'done';
    route?: string;
    parent?: NavItem;
    component?: Type<any>;
    private _children;
    readonly children: NavItem[];
    constructor(name?: string);
}
