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
            var selectedData = _this.workflow = extractedData.find(function (diagram) { return diagram.name === _this.config.projectName; });
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
        { type: Component, args: [{
                    selector: 'us-sidenav',
                    template: "\n    <link href=\"https://fonts.googleapis.com/icon?family=Material+Icons\" rel=\"stylesheet\">\n    <div class=\"container-fluid\">\n      <div class=\"row\">\n        <div class=\"col-lg-12 col-md-12 col-sm-0\">\n          <mat-sidenav-container class=\"example-sidenav-container\">\n            <mat-sidenav #snav role=\"navigation\" opened mode=\"side\" class=\"col-lg-3 col-md-3 col-sm-3\">\n              <mat-nav-list>\n                <us-sidenav-list-item *ngFor=\"let item of navItems\" [item]=\"item\"></us-sidenav-list-item>\n              </mat-nav-list>\n            </mat-sidenav>\n\n            <mat-sidenav-content role=\"main\" class=\"col-lg-9 col-md-9 col-sm-9\">\n              <ng-template form-host></ng-template>\n            </mat-sidenav-content>\n          </mat-sidenav-container>\n        </div>\n      </div>\n    </div>\n  ",
                    styles: ["\n    .example-sidenav-container {\n      height: 1200px;\n    }\n  "],
                    providers: [ComponentRouteService, WorkflowService]
                },] },
    ];
    /** @nocollapse */
    SideNavComponent.ctorParameters = function () { return [
        { type: FormBuilder },
        { type: ChangeDetectorRef },
        { type: ComponentFactoryResolver },
        { type: SideNavConfig },
        { type: WorkflowService },
        { type: ComponentRouteService }
    ]; };
    SideNavComponent.propDecorators = {
        formHost: [{ type: ViewChild, args: [FormDirective,] }],
        item: [{ type: Input }]
    };
    return SideNavComponent;
}());
export { SideNavComponent };
//# sourceMappingURL=sidenav.component.js.map