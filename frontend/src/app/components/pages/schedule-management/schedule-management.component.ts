import { Component } from '@angular/core';

@Component({
  selector: 'app-schedule-management',
  templateUrl: './schedule-management.component.html',
  styleUrl: './schedule-management.component.css'
})
export class ScheduleManagementComponent {
  isSidebarVisible: boolean = false;

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
}
