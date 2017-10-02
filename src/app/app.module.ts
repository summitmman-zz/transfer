import { DialogService } from './service/dialog.service';
import { BroadcasterService } from './service/broadcaster.service';
import { MenuService } from './service/menu.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { DrawerComponent } from './drawer/drawer.component';

import { MdIconModule, MatInputModule, MatTooltipModule, MatDialogModule, MatCardModule } from '@angular/material';
import { MenuComponent } from './menu/menu.component';
import { NotificationsComponent } from './notifications/notifications.component';

@NgModule({
  declarations: [
    AppComponent,
    DrawerComponent,
    MenuComponent,
    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    MdIconModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    MatTooltipModule,
    RouterModule.forRoot([
      { path: 'storecatalog', component: AppComponent },
      { path: 'advancedjson', component: AppComponent },
      { path: 'property', component: AppComponent },
      { path: '*', component: AppComponent }])
  ],
  providers: [
    MenuService,
    BroadcasterService,
    DialogService
  ],
  exports: [
    NotificationsComponent
  ],
  entryComponents: [
    NotificationsComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
