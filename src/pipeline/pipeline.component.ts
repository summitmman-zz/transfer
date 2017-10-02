import { Component, OnInit } from '@angular/core';
import { PipelineService } from '../shared/services/pipeline/pipeline.service';
import * as shape from 'd3-shape';
import { AppEnums } from '../shared/enums/app.enums';
import { AppInterfaces } from '../shared/interfaces/app.interfaces';

@Component({
  selector: 'app-pipeline',
  templateUrl: './pipeline.component.html',
  styleUrls: ['./pipeline.component.css']
})
export class PipelineComponent implements OnInit {

  public refreshChart: boolean = true;
  
  public nodes: Array<AppInterfaces.IProcessNode> = <Array<AppInterfaces.IProcessNode>>[
    <AppInterfaces.IProcessNode>{
      id: 'start',
      label: 'Position FileWatcher',
      isExpanded: false,
      type: AppEnums.ProcessType.FileWatcher,
      startTime: new Date(),
      endTime: new Date()
    }, <AppInterfaces.IProcessNode>{
      id: '1',
      label: 'Query ThreatConnect',
      isExpanded: false,
      type: AppEnums.ProcessType.Code,
      startTime: new Date(),
      endTime: new Date()
    }, <AppInterfaces.IProcessNode>{
      id: '2',
      label: 'Query XForce',
      isExpanded: false,
      type: AppEnums.ProcessType.Logger,
      startTime: new Date(),
      endTime: new Date()
    }, <AppInterfaces.IProcessNode>{
      id: '3',
      label: 'Format Results',
      isExpanded: false,
      type: AppEnums.ProcessType.Batch,
      startTime: new Date(),
      endTime: new Date()
    }, <AppInterfaces.IProcessNode>{
      id: '4',
      label: 'Search Splunk',
      isExpanded: false,
      type: AppEnums.ProcessType.ProcessGroup,
      startTime: new Date(),
      endTime: new Date()
    }, <AppInterfaces.IProcessNode>{
      id: '5',
      label: 'Block LDAP',
      isExpanded: false,
      type: AppEnums.ProcessType.Email,
      startTime: new Date(),
      endTime: new Date()
    }, <AppInterfaces.IProcessNode>{
      id: '6',
      label: 'Email Results',
      isExpanded: false,
      type: AppEnums.ProcessType.Code,
      startTime: new Date(),
      endTime: new Date()
    }
  ];
  public links: Array<AppInterfaces.IProcessLink> = <Array<AppInterfaces.IProcessLink>>[
    <AppInterfaces.IProcessLink>{
      source: 'start',
      target: '1',
      label: 'links to'
    }, <AppInterfaces.IProcessLink>{
      source: 'start',
      target: '2'
    }, <AppInterfaces.IProcessLink>{
      source: '1',
      target: '3',
      label: 'related to'
    }, <AppInterfaces.IProcessLink>{
      source: '2',
      target: '4'
    }, <AppInterfaces.IProcessLink>{
      source: '2',
      target: '6'
    }, <AppInterfaces.IProcessLink>{
      source: '3',
      target: '5'
    }
  ];
  public curve = shape.curveMonotoneX;

  constructor(private _ps: PipelineService) { }

  public ngOnInit(): void {
  }

  public onLegendLabelClick(entry): void {
    console.log('Legend clicked', entry);
  }

  public select(data): void {
    console.log('Item clicked', data);
    data.endTime = new Date();
    // this.refreshChartDiagram();
  }

  public toggleProcess(data): void {
    console.log('toggle clicked', data);
    let node = this.nodes.find(x => x.id == data.id);
    // data.isExpanded = !data.isExpanded;
    node.isExpanded = !node.isExpanded;
    this.refreshChartDiagram();
  }

  private refreshChartDiagram(): void {
    this.refreshChart = false;
    console.log(this.nodes);
    setTimeout(()=>{
      this.refreshChart = true;
    });
  }

  public expandAll(): void {
    this.nodes.forEach(x => x.isExpanded = true);
    this.refreshChartDiagram();
  }
  public collapseAll(): void {
    this.nodes.forEach(x => x.isExpanded = false);
    this.refreshChartDiagram();
  }

  public getIcon(node): string {
    return this._ps.getIcon(node.type);
  }
  public getProcessDesc(node): string  {
    return this._ps.getDesc(node.type);
  }

}
