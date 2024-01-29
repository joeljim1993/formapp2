import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface MenuItem{
  title: string;
  route: string;
}


@Component({
  selector: 'shared-side-menu',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './sideMenu.component.html',
  styles: [`
    :host {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuComponent {

  public reactiveMenu:MenuItem[] = [
    {
      title: 'Basicos',
      route: './reactive/basic',
    },
    {
      title: 'Dinamicos',
      route: './reactive/dinamic',
    },
    {
      title: 'Switches',
      route: './reactive/switches',
    },
  ]

  public authMenu:MenuItem[] = [
    {
      title: 'Registro',
      route: './auth',
    },

  ]

 }
