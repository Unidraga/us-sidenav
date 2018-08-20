import { ChangeDetectorRef, OnInit, OnDestroy, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavItem } from './nav-item';
import { FormDirective } from '../shared/form.directive';
import { ComponentRouteService } from '../shared/route.service';
import { WorkflowService } from '../shared/workflow.service';
export declare class SideNavComponent implements OnInit, OnDestroy {
    private _formBuilder;
    private changeDetectorRef;
    private componentFactoryResolver;
    private workflowService;
    private componentRouteService;
    formHost: FormDirective;
    message: string;
    private mappings;
    workflow: any;
    selectedNav: NavItem;
    item: NavItem;
    navItems: NavItem[];
    constructor(_formBuilder: FormBuilder, changeDetectorRef: ChangeDetectorRef, componentFactoryResolver: ComponentFactoryResolver, workflowService: WorkflowService, componentRouteService: ComponentRouteService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private buildNavList(diagramConnectors, diagramNodes, diagramType, diagramRoot?);
    private buildNavListBPMN(diagramConnectors, diagramNodes, diagramRoot);
    private buildNavListGeneralDiagram(diagramConnectors, diagramNodes);
    private buildNavListOrgChart(diagramConnectors, diagramNodes);
    private findRecursive(navList, name);
    getComponentType(typeName: string): any;
    private loadComponent(component);
}