import { Component, OnInit } from '@angular/core';
import { PeriodsService } from '../../../services/periods.service';

@Component({
  selector: 'app-period-management',
  templateUrl: './period-management.component.html',
  styleUrl: './period-management.component.css'
})

export class PeriodManagementComponent implements OnInit{

  listPeriods: any = [];
  message: string = '';
  showInactivateMessage: boolean = false;
  currentEvent: {id: number, state: number} = {id: 0, state: 0};

  constructor(private periodsService: PeriodsService) {}

  ngOnInit() {
    this.getPeriods();
  }

  getPeriods() {
    this.periodsService.listPeriods().subscribe(
      res => {
        this.listPeriods = res;
      },
      err => console.log(err)
    )
  }

  editPeriod(id: number) {
    console.log('Period to be edited:',id);
  }

  cancelInactivate() {
    this.showInactivateMessage = false;
  }

  prepareChangeStateProgram (event: {id: number, state: number}) {
    this.currentEvent = event;
    if(event.state === 1) {
      this.message = '¿Estás seguro que deseas activar el periodo?'
    }
    else if(event.state === 0){
      this.message = '¿Estás seguro que deseas inactivar el periodo?'
    }
    this.showInactivateMessage = true;
  }

  confirmChangeStatePeriod() {
    this.periodsService.changeStatePeriod(this.currentEvent.id, this.currentEvent.state).subscribe(
      res => {
        console.log(res);
        this.getPeriods();
        this.showInactivateMessage = false;
      },
      err => console.log(err)
    )
  }
}