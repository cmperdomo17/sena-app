import { Component, Output, EventEmitter, Input } from '@angular/core';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() toggleSidebarEvent = new EventEmitter<void>();
  @Input() showSidebarToggle: boolean = true;

  showSignoutMessage: boolean = false;

  toggleSidebar() {
    this.toggleSidebarEvent.emit();
  }

  constructor(private loginService: LoginService) {}

  confirmSignout() {
    this.showSignoutMessage = true;
  }

  signout() {
    this.loginService.logout();
    this.showSignoutMessage = false;
  }

  cancelSignout() {
    this.showSignoutMessage = false;
  }
}