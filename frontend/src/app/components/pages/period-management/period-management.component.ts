import { Component, OnInit } from '@angular/core';
import { PeriodsService } from '../../../services/periods.service';

@Component({
  selector: 'app-period-management',
  templateUrl: './period-management.component.html',
  styleUrl: './period-management.component.css'
})

export class PeriodManagementComponent implements OnInit{

  listPeriods: any = [];

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

  changeStatePeriod (event: {id: number, state: number}) {
    let message = '';
    if(event.state == 1) {
      message = '¿Estás seguro que deseas inactivar el periodo?'
    }
    else {
      message = '¿Estás seguro que deseas activar el periodo?'
    }
    if(window.confirm(message)){
      this.periodsService.changeStatetPeriod(event.id, event.state).subscribe(
        res => {
          console.log(res);
          this.getPeriods();
        },
        err => console.log(err)
      )
    }
  }
}