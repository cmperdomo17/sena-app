import { Component, Input, OnInit } from '@angular/core';
import { Schedule } from '../../../models/Schedule';

@Component({
  selector: 'app-table-schedule',
  templateUrl: './table-schedule.component.html',
  styleUrl: './table-schedule.component.css'
})
export class TableScheduleComponent implements OnInit{
  @Input() headers: string[] = [];
  @Input() table: any[][] = [[]];

  ngOnInit(){
    console.log(this.table);
  }

  shouldDisplayCell(i: number, j: number, cell: any): boolean {
    if (j === 0) {
        return true;
    }else{
      if(cell==undefined){
        return true;
      }else{
        const rowIndex=i+7;
        if(rowIndex==cell.schedule_start_hour) return true;
        if(rowIndex > cell.schedule_start_hour && rowIndex <= cell.schedule_end_hour) return false;
        return true;
      }
    }
  }
  
  getRowSpan(cell: any): number {
    if(cell!=undefined && typeof(cell)!='string'){
      const rowSpan=cell.schedule_end_hour - cell.schedule_start_hour;
      return rowSpan;
    }
    return 1;
  }
}
