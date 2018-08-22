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

  updateIcon(nav: NavItem|undefined, allNew: boolean, allDone: boolean) {
    if (!nav) {
      return;
    }

    if (nav.children && nav.children.length) {
      // branch - set icon according to children's icon
      allNew = nav.children.every(element => element.iconName === 'brightness_1');
      allDone = nav.children.every(element => element.iconName === 'done');
      nav.iconName = allNew || allDone ? nav.children[0].iconName : 'edit';
    } else {
      // leaf - set icon according to data fields
      nav.iconName = allNew ? 'brightness_1' : allDone ? 'done' : 'edit';
    }

    this.updateIcon(nav.parent, allNew, allDone);
  }

  constructor(name?: string) {
    this.displayName = name;
    this.iconName = 'brightness_1';
  }
}
