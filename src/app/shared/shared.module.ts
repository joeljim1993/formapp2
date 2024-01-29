import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SideMenuComponent } from './components/sideMenu/sideMenu.component';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SideMenuComponent,
    RouterModule
  ],
  exports:  [
    SideMenuComponent,

  ]
})
export class SharedModule { }
