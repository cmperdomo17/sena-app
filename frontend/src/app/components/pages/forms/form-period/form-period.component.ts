import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Period } from '../../../../models/Period';
import { PeriodsService } from '../../../../services/periods.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-period',
  templateUrl: './form-period.component.html',
  styleUrl: './form-period.component.css'
})
export class FormPeriodComponent implements OnInit{

  edit: boolean = false;
  warning: string = '';
  success: string = '';
  durationSelected: boolean = false;
  
  period: Period = {
    period_id: 0,
    period_start_date: '',
    period_end_date: '',
    period_name: '',
    period_state: 0
  }

  constructor(private periodsService: PeriodsService, private router: Router, private activatedRoute: ActivatedRoute, private cdr: ChangeDetectorRef) {}

  listPeriods: any = [];

  ngOnInit(): void {

    this.periodsService.listPeriods()
    .subscribe(
      res => {
        this.listPeriods = res;
      },
      err => console.error(err)
    )

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

  // Convertir fecha de yyyy-mm-dd a Date
  convertStringToDate(date: string): Date {
    const [year, month, day] = date.split('-');
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  // Convertir fecha de yyyy-mm-dd a dd/mm/yyyy
  convertDateStringFormat(date: string): string {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }
  
  // Calcular la diferencia en meses entre dos fechas
  diffInMonths(date1: Date, date2: Date): number {
    const diffInYears = date2.getFullYear() - date1.getFullYear();
    const diffInMonths = date2.getMonth() - date1.getMonth();
    return diffInYears * 12 + diffInMonths;
  }

  onDurationChange(duration: string): void{
    this.durationSelected = true;
    if (!this.period.period_start_date) {
      this.warning = 'Por favor ingresa la fecha de inicio del periodo';
      return;
    }
    const durationInMonths = parseInt(duration);
    const startDate = new Date(this.period.period_start_date);
    startDate.setMonth(startDate.getMonth() + durationInMonths);
    this.period.period_end_date = startDate.toISOString().split('T')[0];
  }

  showSuccessMessage(message: string) {
    this.success = message;
    setTimeout(() => {
      this.success = '';
      this.cdr.detectChanges();
      this.router.navigate(['/periods']);
    }, 2000);
  }
  
  saveNewPeriod() {
    if(this.period.period_name=='' || this.period.period_start_date=='' || this.period.period_end_date==''
    ){
      this.warning = 'Por favor ingresa todos los campos';
      return;
    }

    const startDate = this.convertStringToDate(this.period.period_start_date);
    const endDate = this.convertStringToDate(this.period.period_end_date);
  
    // Validar que la fecha de inicio sea menor a la fecha de fin
    if (startDate > endDate) {
      this.warning = 'La fecha de inicio debe ser menor a la fecha de fin';
      return;
    }
  
    // Validar que la duración del periodo de 3 a 6 meses
    const diffMonths = this.diffInMonths(startDate, endDate);
    if (diffMonths < 3 || diffMonths > 6) {
      this.warning = 'La duración del periodo debe ser de 3 a 6 meses';
      return;
    }
  
    this.period.period_start_date = this.convertDateStringFormat(this.period.period_start_date);
    this.period.period_end_date = this.convertDateStringFormat(this.period.period_end_date);

    if (this.listPeriods.find((period: Period) => period.period_name == this.period.period_name)) {
      this.warning = 'El periodo: ' + this.period.period_name + ' ya existe';
      return;
    }

    this.periodsService.createPeriod(this.period).subscribe(
      res => {
        console.log(res);
        this.showSuccessMessage('Periodo creado correctamente');
      },
      err => console.log(err)
    );
  }

  updatePeriod(){
    this.periodsService.updatePeriod(this.period.period_id,this.period).subscribe(
      res=>{
        console.log(res);
        this.showSuccessMessage('Periodo actualizado correctamente');
      },
      err=>console.log(err)
    )
  }

}
