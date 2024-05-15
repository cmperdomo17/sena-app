import { Component, OnInit } from '@angular/core';
import { Period } from '../../../models/Period';
import { PeriodsService } from '../../../services/periods.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-period',
  templateUrl: './form-period.component.html',
  styleUrl: './form-period.component.css'
})
export class FormPeriodComponent implements OnInit{

  edit: boolean = false;
  
  period: Period = {
    period_id: 0,
    period_start_date: '',
    period_end_date: '',
    period_name: '',
    period_state: 0
  }

  constructor(private periodsService: PeriodsService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params['id']){
      this.periodsService.getPeriod(params['id'])
        .subscribe(
          (res: any) => {
            this.period = res[0];
            console.log("Periodo: ",this.period);
            this.edit = true;
          },
          err => console.error(err)
        )
    }
  }

  saveNewPeriod() {
    if(this.period.period_name=='' ||
       this.period.period_start_date=='' ||
       this.period.period_end_date=='' ||
       this.period.period_name==''
    ) {
      alert('Por favor ingresa todos los campos');
      return;
    }
    this.periodsService.createPeriod(this.period).
    subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err)
    )
  }

  updatePeriod(){
    this.periodsService.updatePeriod(this.period.period_id,this.period).subscribe(
      res=>{
        console.log(res);
      },
      err=>console.log(err)
    )
  }

}
