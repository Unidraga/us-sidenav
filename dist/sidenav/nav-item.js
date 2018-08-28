var NavItem = /** @class */ (function () {
    function NavItem(name) {
        this.displayName = name;
        this.iconName = 'brightness_1';
    }
    Object.defineProperty(NavItem.prototype, "children", {
        get: function () {
            if (this._children === undefined) {
                this._children = new Array();
            }
            return this._children;
        },
        enumerable: true,
        configurable: true
    });
    NavItem.prototype.updateIcon = function (nav, model) {
        if (!nav) {
            return;
        }
        if (nav.children && nav.children.length) {
            // branch - set icon according to children's icon
            var allNew = nav.children.every(function (element) { return element.iconName === 'brightness_1'; });
            var allDone = nav.children.every(function (element) { return element.iconName === 'done'; });
            nav.iconName = allNew || allDone ? nav.children[0].iconName : 'edit';
        }
        else {
            // leaf - set icon according to data fields
            var allNew = model.every(function (element) { return element === undefined || element === ''; });
            var allDone = model.every(function (element) { return element !== undefined && element !== ''; });
            nav.iconName = allNew ? 'brightness_1' : allDone ? 'done' : 'edit';
        }
        this.updateIcon(nav.parent);
    };
    return NavItem;
}());
export { NavItem };
//# sourceMappingURL=nav-item.js.map