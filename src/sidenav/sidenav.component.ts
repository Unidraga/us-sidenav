import { ChangeDetectorRef, Component, Input, OnInit, OnDestroy, ComponentFactoryResolver, ViewChild, Type } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavItem } from './nav-item';
import { FormDirective } from '../shared/form.directive';
import { FormComponent } from '../shared/form.component';
import { ComponentRouteService } from '../shared/route.service';
import { WorkflowService } from '../shared/workflow.service';
import { SideNavConfig } from './sidenav-config';
import { SideNavModule } from '../sidenav.module';
@Component({
  selector: 'us-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.less'],
  providers: [ComponentRouteService, WorkflowService]
})
export class SideNavComponent implements OnInit, OnDestroy {
  // @Input() forms: FormItem[];
  @ViewChild(FormDirective) formHost: FormDirective;
  @Input() projectName: string;

  message: string;
  private mappings = new Map<string, any>();
  // private mappings = {
  // 'applicable-conditions': ApplicableConditionsComponent,
  // 'guidance': GuidanceComponent
  // };

  // TODO : use Acqusition data model
  workflow: any;
  selectedNav: NavItem;

  @Input() item: NavItem;

  navItems: NavItem[] = [];

  constructor(private _formBuilder: FormBuilder, private changeDetectorRef: ChangeDetectorRef,
    private componentFactoryResolver: ComponentFactoryResolver, private config: SideNavConfig,
    private workflowService: WorkflowService, private componentRouteService: ComponentRouteService) {
  }

  ngOnInit() {
    this.componentRouteService.componentObservable$.subscribe(
      (component: any) => {
        this.loadComponent(component);
      });

    this.componentRouteService.navObservable$.subscribe(
      (nav: any) => {
        this.selectedNav = nav;
      });

    this.workflowService.getDiagrams().subscribe(
      (data: any) => {
        // console.log(data);
        // const acq = this.acquisition = data[0];
        // this.navItems = this.extractSteps(acq['steps']);
        // console.log(this.navItems);
        const extractedData = data;

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
        const selectedData = this.workflow = extractedData.find(
          (diagram: any) => diagram.name === this.projectName);
        // const selectedData = this.workflow = extractedData[3];
        const definition = selectedData['bpmn:definitions'];
        const diagramType = selectedData['diagramType'];
        const process = definition['bpmn:process'];
        const diagramContents = process[0];
        const diagramRoot = diagramContents['bpmn:startEvent'][0];
        const diagramConnectors = diagramContents['bpmn:sequenceFlow'];
        const diagramNodes = diagramContents['bpmn:task'];
        diagramNodes.push(diagramRoot);
        this.buildNavList(diagramConnectors, diagramNodes, diagramType, diagramRoot);

        // this.navItems = this.extractSteps(acq['steps']);
        console.log(this.navItems);
      },
      (error: any) => {
        console.log('Error : ' + error.message);
      }
    );
  }

  ngOnDestroy(): void {
  }

  private buildNavList(diagramConnectors: any, diagramNodes: any, diagramType: string, diagramRoot?: any) {
    switch (diagramType) {
      case 'MindMap':
      case 'GeneralDiagram': this.buildNavListGeneralDiagram(diagramConnectors, diagramNodes);
        break;
      case 'OrgChart': this.buildNavListOrgChart(diagramConnectors, diagramNodes);
        break;
      case 'BPMN': this.buildNavListBPMN(diagramConnectors, diagramNodes, diagramRoot);
        break;
      default: console.error('Unable to parse diagram type - ' + diagramType);
    }
  }

  private buildNavListBPMN(diagramConnectors: any, diagramNodes: any, diagramRoot: any) {
    const rootNode = diagramRoot;
    const rootNodeName = rootNode.attr.name;

    let item = new NavItem();
    item.displayName = rootNodeName;
    this.navItems.push(item);

    diagramConnectors.forEach((element: any) => {
      element = element.attr;
      const sourceNodeID = element.sourceRef;
      const targetNodeID = element.targetRef;

      const sourceNode = diagramNodes.find((node: any) => node.attr.id === sourceNodeID);
      const sourceNodeName = sourceNode.attr.name;

      const targetNode = diagramNodes.find((node: any) => node.attr.id === targetNodeID);
      const targetNodeName = targetNode.attr.name;

      // TODO: recursive here
      console.log('source ' + sourceNodeName);
      console.log('target ' + targetNodeName);
      const resultNav = this.findRecursive(this.navItems, sourceNodeName);
      if (resultNav !== undefined) {
        console.log('found ' + sourceNodeName + ' pointing to ' + targetNodeName);
      } else {
        console.log('not found ' + sourceNodeName + ' pointing to ' + targetNodeName);
        console.log(this.navItems);
        return;
      }

      item = new NavItem();
      item.displayName = targetNodeName;
      item.parent = resultNav;
      resultNav.children.push(item);
    });
  }

  private buildNavListGeneralDiagram(diagramConnectors: any, diagramNodes: any) {
    const rootNode = diagramNodes[0];
    const rootNodeName = rootNode['annotations'][0]['content'];

    let item = new NavItem();
    item.displayName = rootNodeName;
    this.navItems.push(item);

    diagramConnectors.forEach((element: any) => {
      const sourceNodeID = element['sourceID'];
      const targetNodeID = element['targetID'];

      const sourceNode = diagramNodes.find((node: any) => node.id === sourceNodeID);
      const sourceNodeName = sourceNode['annotations'][0]['content'];

      const targetNode = diagramNodes.find((node: any) => node.id === targetNodeID);
      const targetNodeName = targetNode['annotations'][0]['content'];

      // TODO: recursive here
      console.log('source ' + sourceNodeName);
      console.log('target ' + targetNodeName);
      const resultNav = this.findRecursive(this.navItems, sourceNodeName);
      if (resultNav !== undefined) {
        console.log('found ' + sourceNodeName + ' pointing to ' + targetNodeName);
      } else {
        console.log('not found ' + sourceNodeName + ' pointing to ' + targetNodeName);
        console.log(this.navItems);
        return;
      }

      item = new NavItem();
      item.displayName = targetNodeName;
      item.parent = resultNav;
      resultNav.children.push(item);
    });
  }

  private buildNavListOrgChart(diagramConnectors: any, diagramNodes: any) {
    const rootNode = diagramNodes.find((node: any) => node.id === 'rootNode');
    const rootNodeName = rootNode['addInfo']['Name']['value'];

    let item = new NavItem();
    item.displayName = rootNodeName;
    this.navItems.push(item);

    diagramConnectors.forEach((element: any) => {
      const sourceNodeID = element['sourceID'];
      const targetNodeID = element['targetID'];

      const sourceNode = diagramNodes.find((node: any) => node.id === sourceNodeID);
      const sourceNodeName = sourceNode['addInfo']['Name']['value'];

      const targetNode = diagramNodes.find((node: any) => node.id === targetNodeID);
      const targetNodeName = targetNode['addInfo']['Name']['value'];

      // TODO: recursive here
      console.log('source ' + sourceNodeName);
      console.log('target ' + targetNodeName);
      const resultNav = this.findRecursive(this.navItems, sourceNodeName);
      if (resultNav !== undefined) {
        console.log('found ' + sourceNodeName + ' pointing to ' + targetNodeName);
      } else {
        console.log('not found ' + sourceNodeName + ' pointing to ' + targetNodeName);
        console.log(this.navItems);
        return;
      }

      item = new NavItem();
      item.displayName = targetNodeName;
      item.parent = resultNav;
      resultNav.children.push(item);
    });
  }

  private findRecursive(navList: any, name: string): NavItem {
    let result = navList.find((node: any) => node.displayName === name);
    if (result !== undefined) {
      return result;
    }

    navList.some((element: any) => {
      result = this.findRecursive(element.children, name);
      if (result !== undefined) {
        return result;
      }
    });
    return result;
  }

  getComponentType(typeName: string) {
    const type = (this.mappings as { [key: string]: any })[typeName];
    // const type = this.mappings[typeName];
    // TODO: UnknownDynamicComponent
    return type; // || UnknownDynamicComponent;
  }

  private loadComponent(component: Type<any>) {
    if (component === undefined) {
      console.error('No such Component - ' + component);
      return;
    }

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

    const viewContainerRef = this.formHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    // (<FormComponent>componentRef.instance).data = this.acquisition;
    (<FormComponent>componentRef.instance).navItem = this.selectedNav;
  }
}
