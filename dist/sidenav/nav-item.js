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
    return NavItem;
}());
export { NavItem };
//# sourceMappingURL=nav-item.js.map