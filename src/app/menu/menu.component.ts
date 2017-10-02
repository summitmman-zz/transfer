import { BroadcasterService } from './../service/broadcaster.service';
import { DrawerComponent } from './../drawer/drawer.component';
import { Router } from '@angular/router';
import { Menu } from './node.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {

  @Input() nodes: Menu[];
  @Input() isDrawerOpened: boolean;

  constructor(private router: Router, private broadcastService: BroadcasterService) { }

  ngOnInit() {
  }

  onParentNodeClick(menu: Menu) {
    // Opens the drawer if the drawer is closed
    this.broadcastService.broadcast('drawerState', 'opened');
    
    // Expands or collapses the the parent node
    menu.isItemExpanded = !menu.isItemExpanded;
  }
}
