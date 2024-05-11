import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() toggleSidebarEvent = new EventEmitter<void>();
  @Input() showSidebarToggle: boolean = true;
  @Input() showProfileButton: boolean = true;

  toggleSidebar() {
    this.toggleSidebarEvent.emit();
  }

  confirmSignout() {
    return window.confirm('¿Seguro que quieres cerrar sesión?');
  }
}