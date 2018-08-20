import { Directive, ViewContainerRef } from '@angular/core';
var FormDirective = /** @class */ (function () {
    function FormDirective(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    FormDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[usFormHost]',
                },] },
    ];
    /** @nocollapse */
    FormDirective.ctorParameters = function () { return [
        { type: ViewContainerRef }
    ]; };
    return FormDirective;
}());
export { FormDirective };
//# sourceMappingURL=form.directive.js.map