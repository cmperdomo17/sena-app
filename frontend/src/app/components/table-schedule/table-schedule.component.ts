import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-table-schedule',
  templateUrl: './table-schedule.component.html',
  styleUrl: './table-schedule.component.css'
})
export class TableScheduleComponent {
  @Input() headers: string[] = [];
  @Input() rows: any[] = [];
}
