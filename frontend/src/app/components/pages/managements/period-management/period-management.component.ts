import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PeriodsService } from '../../../../services/periods.service';

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
  success: string = '';

  constructor(private periodsService: PeriodsService, private cdr: ChangeDetectorRef) {}

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

  showSuccessMessage(message: string) {
    this.success = message;
    setTimeout(() => {
      this.success = '';
      this.cdr.detectChanges();
    }, 2000);
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
        if (this.currentEvent.state === 1) {
          this.showSuccessMessage('Periodo activado correctamente');
        } else if (this.currentEvent.state === 0) {
          this.showSuccessMessage('Periodo inactivado correctamente');
        }
      },
      err => console.log(err)
    )
  }
}