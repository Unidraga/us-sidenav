import { Type } from '@angular/core';

export class NavItem {
  displayName: string | undefined;
  disabled?: boolean;
  iconName?: 'brightness_1' | 'edit' | 'done';
  route?: string;
  parent?: NavItem;
  component?: Type<any>;
  // children?: NavItem[];

  private _children: NavItem[];

  get children(): NavItem[] {
    if (this._children === undefined) {
      this._children = new Array<NavItem>();
    }
    return this._children;
  }



  constructor(name?: string) {
    this.displayName = name;
    this.iconName = 'brightness_1';
  }
}
