import { DialogService } from './../service/dialog.service';
import { BroadcasterService } from './../service/broadcaster.service';
import { NotificationsComponent } from './../notifications/notifications.component';
import { Menu } from './../menu/node.model';
import { MenuService } from './../service/menu.service';
import { Component, OnInit, HostListener, ViewChild, ElementRef, Renderer } from '@angular/core';
import { trigger, state, animate, style, transition } from "@angular/animations";
import { ActivatedRoute, Router } from "@angular/router";
import { MdDialog } from "@angular/material/dialog";

@Component({
	selector: 'app-drawer',
	templateUrl: './drawer.component.html',
	styleUrls: ['./drawer.component.css'],
	animations: [
		trigger('hamburger-state', [
			state('collapsed', style({ display: 'fixed' })),
			state('expanded', style({ display: 'none' })),
			transition('*<=>*', animate('150ms'))
		]),
		trigger('menulist-state', [
			state('expand', style({ maxHeight: '100px' })),
			state('hide', style({ maxHeight: 0 })),
			transition('expand<=>hide', animate(350))
		])
	]
})
export class DrawerComponent implements OnInit {

	@ViewChild('searchElement') searchBox: ElementRef;

	public isExpanded: boolean;
	public menulist: Menu[] = [];
	public searchState: string = 'nofocus';

	/**
	 * DrawerComponent public constructor
	 * @param renderer 
	 * @param service 
	 * @param route 
	 * @param broadcastService 
	 * @param dialogService 
	 */
	public constructor(
		private renderer: Renderer,
		private service: MenuService,
		private route: ActivatedRoute,
		private broadcastService: BroadcasterService,
		private dialogService: DialogService
	) { }

	/**
	 * 
	 */
	public ngOnInit() {
		this.service.getAll().subscribe(nodes => {
			Object.assign(this.menulist, nodes);
			this.menulist.forEach(node => {
				console.log(node.label)
				if (node.isRoot) {
					console.log(node.label)
					node.label = node.label.toUpperCase();
					console.log(node.label)
				}
			});
		});
		this.broadcastService.on('drawerState').subscribe((state) => {
			if (state === 'opened')
				this.openDrawer();
			else
				this.closeDrawer();
		});
	}

	showNotificationList() {
		this.dialogService.open();
	}

	getSearchState(searchString: string) {
		return searchString.length > 0 ? 'infocus' : this.searchState;
	}

	/**
	 * 
	 */
	public isSearching() {
		return this.getSearchState(this.searchBox.nativeElement.value) == 'infocus' ? true : false;
	}

	public openDrawer() {
		this.isExpanded = true;
		// TODO: expand the nodes until the active component node is highlighted
	}

	public closeDrawer() {
		this.isExpanded = false;
		this.collapseChildNodesRecursively(this.menulist);
	}

	collapseChildNodesRecursively(children: Menu[]) {
		if (children)
			children.forEach((node) => {
				node.isItemExpanded = false;
				this.collapseChildNodesRecursively(node.children);
			});
	}

	@HostListener('document:keyup', ['$event'])
	handleKeyboardEvent(event: KeyboardEvent) {
		if (event.keyCode === 27) {
			if (this.isSearching())
				this.cancelSearch();
			else if (this.isExpanded)
				this.closeDrawer();
		}
	}

	startSearch() {
		//this.searchBox.nativeElement.focus();
		setTimeout(() => {
			this.renderer.invokeElementMethod(this.searchBox.nativeElement, 'focus', []);
		});
		this.searchState = 'infocus';
	}

	cancelSearch() {
		this.searchBox.nativeElement.value = "";
		this.searchBox.nativeElement.blur();
		this.searchState = 'nofocus';
	}
}