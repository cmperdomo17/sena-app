import { Component } from '@angular/core';

@Component({
  selector: 'app-control-side-bar',
  templateUrl: './control-side-bar.component.html',
  styleUrl: './control-side-bar.component.css'
})
export class ControlSideBarComponent {
  isSidebarVisible: boolean = false;

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
}
