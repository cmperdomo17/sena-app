import { Component, Input } from '@angular/core';
import { Schedule } from '../../../models/Schedule';

@Component({
  selector: 'app-table-schedule',
  templateUrl: './table-schedule.component.html',
  styleUrl: './table-schedule.component.css'
})
export class TableScheduleComponent {
  @Input() headers: string[] = [];
  @Input() table: Schedule[][] = [[]];

  shouldDisplayCell(i: number, j: number): boolean {
    return i === this.table[i][j].schedule_start_hour - 7;
  }
  
  getRowSpan(cell: any): number {
    return cell.schedule_end_hour - cell.schedule_start_hour;
  }
}
