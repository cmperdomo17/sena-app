import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  @Output() closeSidebar = new EventEmitter<void>();

  close() {
    this.closeSidebar.emit();
  }
}
