import { Component, OnInit, Input } from '@angular/core';
import { AppInterfaces } from '../shared/interfaces/app.interfaces';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {

  @Input() tree: AppInterfaces.ITreeNode;
  @Input() display: string = '';
  @Input() children: string = '';
  @Input() leftPadding: string = '20px';

  public constructor() { }

  public ngOnInit(): void {
    this.processTree(this.tree);
  }

  private processTree(child): void {
    if(child['isExpand'] === undefined) {
      child['isExpand'] = false;
    }
    if(child[this.children] && child[this.children].length) {
      for(let item of child[this.children])
      this.processTree(item);
    }
  }

}
