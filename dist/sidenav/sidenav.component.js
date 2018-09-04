import { ChangeDetectorRef, Component, Input, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavItem } from './nav-item';
import { FormDirective } from '../shared/form.directive';
import { ComponentRouteService } from '../shared/route.service';
import { WorkflowService } from '../shared/workflow.service';
import { SideNavConfig } from './sidenav-config';
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
        // (<FormComponent>componentRef.instance).data = this.acquisition;
        componentRef.instance.navItem = this.selectedNav;
    };
    SideNavComponent.decorators = [
        { type: Component, args: [{
                    selector: 'us-sidenav',
                    template: "\n    <link href=\"https://fonts.googleapis.com/icon?family=Material+Icons\" rel=\"stylesheet\">\n    <link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css\" integrity=\"sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO\"\n      crossorigin=\"anonymous\">\n    <div>\n      <mat-sidenav-container class=\"mat-sidenav-container\">\n        <mat-sidenav #snav role=\"navigation\" opened mode=\"side\" class=\"sidenav-container\">\n          <div class=\"sidenav-header\">\n              <span class=\"back\" [routerLink]=\"backUrl\">\n                <i class=\"fa fa-angle-left fa-lg\"></i>&nbsp; MY ACQUISITIONS</span>\n          </div>\n          <div class=\"sidenav-main\">\n            <mat-nav-list>\n              <us-sidenav-list-item *ngFor=\"let item of navItems\" [item]=\"item\"></us-sidenav-list-item>\n            </mat-nav-list>\n          </div>\n        </mat-sidenav>\n\n        <mat-sidenav-content role=\"main\">\n          <ng-template usFormHost></ng-template>\n        </mat-sidenav-content>\n      </mat-sidenav-container>\n    </div>\n\n    <script src=\"https://code.jquery.com/jquery-3.3.1.slim.min.js\" integrity=\"sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo\"\n      crossorigin=\"anonymous\"></script>\n    <script src=\"https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js\" integrity=\"sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49\"\n      crossorigin=\"anonymous\"></script>\n    <script src=\"https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js\" integrity=\"sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy\"\n      crossorigin=\"anonymous\"></script>\n  ",
                    styles: ["\n    .mat-sidenav-container {\n      min-height: 1800px;\n    }\n    .sidenav-header {\n      display: flex;\n      padding-left: 2em;\n      letter-spacing: 1px;\n      width: auto;\n      height: 5rem;\n    }\n    .sidenav-header span {\n      color: #210f72;\n    }\n    .sidenav-main {\n      display: flex;\n      align-items: center;\n      justify-content: left;\n      padding-left: 2em;\n      letter-spacing: 1px;\n      width: auto;\n      height: 5rem;\n    }\n    .sidenav-main span {\n      color: #210f72;\n    }\n  "],
                    providers: [ComponentRouteService, WorkflowService]
                },] },
    ];
    /** @nocollapse */
    SideNavComponent.ctorParameters = function () { return [
        { type: FormBuilder, },
        { type: ChangeDetectorRef, },
        { type: ComponentFactoryResolver, },
        { type: SideNavConfig, },
        { type: WorkflowService, },
        { type: ComponentRouteService, },
    ]; };
    SideNavComponent.propDecorators = {
        "formHost": [{ type: ViewChild, args: [FormDirective,] },],
        "name": [{ type: Input },],
        "item": [{ type: Input },],
    };
    return SideNavComponent;
}());
export { SideNavComponent };
//# sourceMappingURL=sidenav.component.js.map