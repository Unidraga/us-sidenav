(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs/Subject'), require('@angular/common/http'), require('@angular/forms'), require('@angular/animations'), require('@angular/material'), require('@angular/common'), require('@angular/platform-browser/animations')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'rxjs/Subject', '@angular/common/http', '@angular/forms', '@angular/animations', '@angular/material', '@angular/common', '@angular/platform-browser/animations'], factory) :
    (factory((global.usSidenav = {}),global.ng.core,global.Rx.Subject,global.ng.common.http,global.ng.forms,global.ng.animations,global.ng.material,global.ng.common,global.ng['platform-browser'].animations));
}(this, (function (exports,core,Subject,http,forms,animations,material,common,animations$1) { 'use strict';

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

    var FormDirective = /** @class */ (function () {
        function FormDirective(viewContainerRef) {
            this.viewContainerRef = viewContainerRef;
        }
        FormDirective.decorators = [
            { type: core.Directive, args: [{
                        selector: '[usFormHost]',
                    },] },
        ];
        /** @nocollapse */
        FormDirective.ctorParameters = function () { return [
            { type: core.ViewContainerRef }
        ]; };
        return FormDirective;
    }());

    var ComponentRouteService = /** @class */ (function () {
        function ComponentRouteService() {
            // Observable string sources
            this.componentSource = new Subject.Subject();
            this.navSource = new Subject.Subject();
            // Observable string streams
            this.componentObservable$ = this.componentSource.asObservable();
            this.navObservable$ = this.navSource.asObservable();
        }
        // Service message commands
        ComponentRouteService.prototype.updateComponent = function (component) {
            this.componentSource.next(component);
        };
        ComponentRouteService.prototype.updateNavItem = function (item) {
            this.navSource.next(item);
        };
        ComponentRouteService.prototype.updateNavItemAndComponent = function (item) {
            this.navSource.next(item);
            this.componentSource.next(item.component);
        };
        ComponentRouteService.decorators = [
            { type: core.Injectable },
        ];
        return ComponentRouteService;
    }());

    // This file can be replaced during build by using the `fileReplacements` array.
    // `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
    // The list of file replacements can be found in `angular.json`.
    var environment = {
        production: false,
        API_URL: 'http://localhost:3000'
    };
    /*
     * In development mode, to ignore zone related error stack frames such as
     * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
     * import the following file, but please comment it out in production mode
     * because it will have performance impact when throw error
     */
    // import 'zone.js/dist/zone-error';  // Included with Angular CLI.

    // import { Workflow } from '../workflow';
    // Classes
    // import { Email } from '../data/system/email';
    // import { User } from '../data/identity/user';
    var WorkflowService = /** @class */ (function () {
        function WorkflowService(http$$1) {
            this.http = http$$1;
            this.baseRoute = '/workflow';
            this.URL_GET_DIAGRAMS = environment.API_URL + this.baseRoute + '/diagrams';
            this.URL_SAVE_DIAGRAM = environment.API_URL + this.baseRoute + '/save';
            this.URL_LOAD_DIAGRAM = environment.API_URL + this.baseRoute + '/load';
        }
        WorkflowService.prototype.getDiagrams = function () {
            // const body = JSON.stringify({ email });
            var headers = new http.HttpHeaders({ 'Content-Type': 'application/json' });
            return this.http.get(this.URL_GET_DIAGRAMS, { headers: headers });
        };
        WorkflowService.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        WorkflowService.ctorParameters = function () { return [
            { type: http.HttpClient }
        ]; };
        return WorkflowService;
    }());

    var SideNavConfig = /** @class */ (function () {
        // private mappings: Map<string, any>();
        function SideNavConfig(routes) {
            this.routes = routes;
        }
        return SideNavConfig;
    }());

    var SideNavComponent = /** @class */ (function () {
        function SideNavComponent(_formBuilder, changeDetectorRef, componentFactoryResolver, config, workflowService, componentRouteService) {
            this._formBuilder = _formBuilder;
            this.changeDetectorRef = changeDetectorRef;
            this.componentFactoryResolver = componentFactoryResolver;
            this.config = config;
            this.workflowService = workflowService;
            this.componentRouteService = componentRouteService;
            this.name = '';
            this.mappings = new Map();
            this.navItems = [];
        }
        SideNavComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.componentRouteService.componentObservable$.subscribe(function (component) {
                _this.loadComponent(component);
            });
            this.componentRouteService.navObservable$.subscribe(function (nav) {
                _this.selectedNav = nav;
            });
            this.workflowService.getDiagrams().subscribe(function (data) {
                // console.log(data);
                // const acq = this.acquisition = data[0];
                // this.navItems = this.extractSteps(acq['steps']);
                // console.log(this.navItems);
                var extractedData = data;
                console.log(data);
                // SyncFusion
                // const firstData = this.workflow = extractedData[0];
                // const project = firstData['pageOptionList'];
                // const diagramType = firstData['diagramType'];
                // const firstDiagram = project[0];
                // const diagramContents = firstDiagram['diagram'];
                // const diagramConnectors = diagramContents['connectors'];
                // const diagramNodes = diagramContents['nodes'];
                // Angular BPMN
                var selectedData = _this.workflow = extractedData.find(function (diagram) { return diagram.name === _this.name; });
                if (!selectedData) {
                    console.error('Unable to find project name - ' + _this.name);
                    return;
                }
                // const selectedData = this.workflow = extractedData[3];
                var definition = selectedData['bpmn:definitions'];
                var diagramType = selectedData['diagramType'];
                var process = definition['bpmn:process'];
                var diagramContents = process[0];
                var diagramRoot = diagramContents['bpmn:startEvent'][0];
                var diagramConnectors = diagramContents['bpmn:sequenceFlow'];
                var diagramNodes = diagramContents['bpmn:task'];
                diagramNodes.push(diagramRoot);
                _this.buildNavList(diagramConnectors, diagramNodes, diagramType, diagramRoot);
                // this.navItems = this.extractSteps(acq['steps']);
                console.log(_this.navItems);
                _this.populateMappingsFromLeaves(_this.navItems, _this.config);
                _this.mappings.forEach(function (value, key) {
                    if (!value || value === '') {
                        console.error(key + ' is not bound to any component');
                    }
                });
            }, function (error) {
                console.log('Error : ' + error.message);
            });
        };
        SideNavComponent.prototype.ngOnDestroy = function () {
        };
        SideNavComponent.prototype.buildNavList = function (diagramConnectors, diagramNodes, diagramType, diagramRoot) {
            switch (diagramType) {
                case 'MindMap':
                case 'GeneralDiagram':
                    this.buildNavListGeneralDiagram(diagramConnectors, diagramNodes);
                    break;
                case 'OrgChart':
                    this.buildNavListOrgChart(diagramConnectors, diagramNodes);
                    break;
                case 'BPMN':
                    this.buildNavListBPMN(diagramConnectors, diagramNodes, diagramRoot);
                    break;
                default: console.error('Unable to parse diagram type - ' + diagramType);
            }
        };
        SideNavComponent.prototype.buildNavListBPMN = function (diagramConnectors, diagramNodes, diagramRoot) {
            var _this = this;
            var rootNode = diagramRoot;
            var rootNodeName = rootNode.attr.name;
            var item = new NavItem();
            item.displayName = rootNodeName;
            this.navItems.push(item);
            diagramConnectors.forEach(function (element) {
                element = element.attr;
                var sourceNodeID = element.sourceRef;
                var targetNodeID = element.targetRef;
                var sourceNode = diagramNodes.find(function (node) { return node.attr.id === sourceNodeID; });
                var sourceNodeName = sourceNode.attr.name;
                var targetNode = diagramNodes.find(function (node) { return node.attr.id === targetNodeID; });
                var targetNodeName = targetNode.attr.name;
                // TODO: recursive here
                console.log('source ' + sourceNodeName);
                console.log('target ' + targetNodeName);
                var resultNav = _this.findRecursive(_this.navItems, sourceNodeName);
                if (resultNav !== undefined) {
                    console.log('found ' + sourceNodeName + ' pointing to ' + targetNodeName);
                }
                else {
                    console.error('not found ' + sourceNodeName + ' pointing to ' + targetNodeName);
                    console.log(_this.navItems);
                    return;
                }
                item = new NavItem();
                item.displayName = targetNodeName;
                item.parent = resultNav;
                resultNav.children.push(item);
            });
        };
        SideNavComponent.prototype.buildNavListGeneralDiagram = function (diagramConnectors, diagramNodes) {
            var _this = this;
            var rootNode = diagramNodes[0];
            var rootNodeName = rootNode['annotations'][0]['content'];
            var item = new NavItem();
            item.displayName = rootNodeName;
            this.navItems.push(item);
            diagramConnectors.forEach(function (element) {
                var sourceNodeID = element['sourceID'];
                var targetNodeID = element['targetID'];
                var sourceNode = diagramNodes.find(function (node) { return node.id === sourceNodeID; });
                var sourceNodeName = sourceNode['annotations'][0]['content'];
                var targetNode = diagramNodes.find(function (node) { return node.id === targetNodeID; });
                var targetNodeName = targetNode['annotations'][0]['content'];
                // TODO: recursive here
                console.log('source ' + sourceNodeName);
                console.log('target ' + targetNodeName);
                var resultNav = _this.findRecursive(_this.navItems, sourceNodeName);
                if (resultNav !== undefined) {
                    console.log('found ' + sourceNodeName + ' pointing to ' + targetNodeName);
                }
                else {
                    console.log('not found ' + sourceNodeName + ' pointing to ' + targetNodeName);
                    console.log(_this.navItems);
                    return;
                }
                item = new NavItem();
                item.displayName = targetNodeName;
                item.parent = resultNav;
                resultNav.children.push(item);
            });
        };
        SideNavComponent.prototype.buildNavListOrgChart = function (diagramConnectors, diagramNodes) {
            var _this = this;
            var rootNode = diagramNodes.find(function (node) { return node.id === 'rootNode'; });
            var rootNodeName = rootNode['addInfo']['Name']['value'];
            var item = new NavItem();
            item.displayName = rootNodeName;
            this.navItems.push(item);
            diagramConnectors.forEach(function (element) {
                var sourceNodeID = element['sourceID'];
                var targetNodeID = element['targetID'];
                var sourceNode = diagramNodes.find(function (node) { return node.id === sourceNodeID; });
                var sourceNodeName = sourceNode['addInfo']['Name']['value'];
                var targetNode = diagramNodes.find(function (node) { return node.id === targetNodeID; });
                var targetNodeName = targetNode['addInfo']['Name']['value'];
                // TODO: recursive here
                console.log('source ' + sourceNodeName);
                console.log('target ' + targetNodeName);
                var resultNav = _this.findRecursive(_this.navItems, sourceNodeName);
                if (resultNav !== undefined) {
                    console.log('found ' + sourceNodeName + ' pointing to ' + targetNodeName);
                }
                else {
                    console.log('not found ' + sourceNodeName + ' pointing to ' + targetNodeName);
                    console.log(_this.navItems);
                    return;
                }
                item = new NavItem();
                item.displayName = targetNodeName;
                item.parent = resultNav;
                resultNav.children.push(item);
            });
        };
        SideNavComponent.prototype.findRecursive = function (navList, name) {
            var _this = this;
            var result = navList.find(function (node) { return node.displayName === name; });
            if (result !== undefined) {
                return result;
            }
            navList.some(function (element) {
                result = _this.findRecursive(element.children, name);
                if (result !== undefined) {
                    return result;
                }
            });
            return result;
        };
        SideNavComponent.prototype.populateMappingsFromLeaves = function (navList, routes) {
            var _this = this;
            if (!navList) {
                return;
            }
            navList.forEach(function (element) {
                if (!element.children || !element.children.length) {
                    var route = routes.find(function (route) { return route.path === element.displayName; });
                    _this.mappings.set(element.displayName, route ? route.component : undefined);
                    element.component = route ? route.component : undefined;
                }
                _this.populateMappingsFromLeaves(element.children, routes);
            });
        };
        SideNavComponent.prototype.getComponentType = function (typeName) {
            var type = this.mappings[typeName];
            // const type = this.mappings[typeName];
            // TODO: UnknownDynamicComponent
            return type; // || UnknownDynamicComponent;
        };
        SideNavComponent.prototype.loadComponent = function (component) {
            if (component === undefined) {
                console.error('No such Component - ' + component);
                return;
            }
            var componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
            var viewContainerRef = this.formHost.viewContainerRef;
            viewContainerRef.clear();
            var componentRef = viewContainerRef.createComponent(componentFactory);
            // (<FormComponent>componentRef.instance).data = this.acquisition;
            componentRef.instance.navItem = this.selectedNav;
        };
        SideNavComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'us-sidenav',
                        template: "\n    <link href=\"https://fonts.googleapis.com/icon?family=Material+Icons\" rel=\"stylesheet\">\n    <mat-sidenav-container class=\"container-fluid sidenav-container col-lg-12 col-md-12 col-sm-0\">\n      <mat-sidenav #snav role=\"navigation\" opened mode=\"side\" class=\"col-lg-3 col-md-3 col-sm-0\">\n        <mat-nav-list>\n          <us-sidenav-list-item *ngFor=\"let item of navItems\" [item]=\"item\"></us-sidenav-list-item>\n        </mat-nav-list>\n      </mat-sidenav>\n\n      <mat-sidenav-content role=\"main\" class=\"col-lg-9 col-md-9 col-sm-0\">\n        <ng-template usFormHost></ng-template>\n      </mat-sidenav-content>\n    </mat-sidenav-container>\n  ",
                        styles: ["\n    .sidenav-container {\n      min-height: 59em;\n    }\n  "],
                        providers: [ComponentRouteService, WorkflowService]
                    },] },
        ];
        /** @nocollapse */
        SideNavComponent.ctorParameters = function () { return [
            { type: forms.FormBuilder },
            { type: core.ChangeDetectorRef },
            { type: core.ComponentFactoryResolver },
            { type: SideNavConfig },
            { type: WorkflowService },
            { type: ComponentRouteService }
        ]; };
        SideNavComponent.propDecorators = {
            formHost: [{ type: core.ViewChild, args: [FormDirective,] }],
            name: [{ type: core.Input }],
            item: [{ type: core.Input }]
        };
        return SideNavComponent;
    }());

    var SideNavListItemComponent = /** @class */ (function () {
        // subscription: Subscription;
        function SideNavListItemComponent(componentRouteService) {
            this.componentRouteService = componentRouteService;
            this.ariaExpanded = this.expanded;
        }
        SideNavListItemComponent.prototype.ngOnInit = function () {
            if (this.depth === undefined) {
                this.depth = 0;
            }
        };
        SideNavListItemComponent.prototype.onItemSelected = function (item) {
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
        };
        SideNavListItemComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'us-sidenav-list-item',
                        template: "\n    <a mat-list-item [ngStyle]=\"{'padding-left': (depth * 1.5) + 'em'}\" (click)=\"onItemSelected(item)\"\n                  [ngClass]=\"{'active': item.route ? router.isActive(item.route, true): false, 'expanded': expanded}\">\n      <mat-icon class=\"routeIcon\"><small>{{item.iconName}}</small></mat-icon>\n      {{item.displayName}}\n      <span fxFlex *ngIf=\"item.children && item.children.length\">\n        <span fxFlex></span>\n        <mat-icon [@indicatorRotate]=\"expanded ? 'expanded': 'collapsed'\">\n          expand_more\n        </mat-icon>\n      </span>\n    </a>\n    <div *ngIf=\"expanded\">\n      <us-sidenav-list-item *ngFor=\"let child of item.children\" [item]=\"child\" [depth]=\"depth+1\">\n      </us-sidenav-list-item>\n    </div>\n  ",
                        styles: ["\n    :host {\n      display: block;\n      outline: none;\n    }\n    .mat-list-item {\n      padding: 8px 0;\n    }\n    .mat-list-item .routeIcon {\n      margin-right: 40px;\n    }\n  "],
                        animations: [
                            animations.trigger('indicatorRotate', [
                                animations.state('collapsed', animations.style({ transform: 'rotate(0deg)' })),
                                animations.state('expanded', animations.style({ transform: 'rotate(180deg)' })),
                                animations.transition('expanded <=> collapsed', animations.animate('225ms cubic-bezier(0.4,0.0,0.2,1)')),
                            ])
                        ]
                    },] },
        ];
        /** @nocollapse */
        SideNavListItemComponent.ctorParameters = function () { return [
            { type: ComponentRouteService }
        ]; };
        SideNavListItemComponent.propDecorators = {
            ariaExpanded: [{ type: core.HostBinding, args: ['attr.aria-expanded',] }],
            item: [{ type: core.Input }],
            depth: [{ type: core.Input }]
        };
        return SideNavListItemComponent;
    }());

    var MaterialModule = /** @class */ (function () {
        function MaterialModule() {
        }
        MaterialModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [material.MatSidenavModule, material.MatListModule, material.MatIconModule],
                        exports: [material.MatSidenavModule, material.MatListModule, material.MatIconModule],
                    },] },
        ];
        return MaterialModule;
    }());

    var SideNavModule = /** @class */ (function () {
        function SideNavModule() {
        }
        SideNavModule.forRoot = function (routes) {
            return {
                ngModule: SideNavModule,
                providers: [{ provide: SideNavConfig, useValue: routes }]
            };
        };
        SideNavModule.forChild = function (routes) {
            return {
                ngModule: SideNavModule,
                providers: [{ provide: SideNavConfig, useValue: routes }]
            };
        };
        SideNavModule.decorators = [
            { type: core.NgModule, args: [{
                        imports: [
                            common.CommonModule,
                            forms.FormsModule,
                            forms.ReactiveFormsModule,
                            MaterialModule,
                            animations$1.BrowserAnimationsModule
                            // RouterModule.forChild(rolesRoutes)
                        ],
                        providers: [],
                        declarations: [
                            SideNavComponent,
                            SideNavListItemComponent,
                            FormDirective
                            // RolesComponent,
                            // ListComponent,
                            // AddEditViewComponent,
                            // DeleteComponent
                        ],
                        exports: [
                            SideNavComponent
                        ]
                    },] },
        ];
        return SideNavModule;
    }());

    exports.SideNavModule = SideNavModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
