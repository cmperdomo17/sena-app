import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Teacher } from '../../../models/Teachers';
import { UserTeacherService } from '../../../services/user-teacher.service';
import { Period } from '../../../models/Period';
import { Schedule } from '../../../models/Schedule';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent implements AfterViewInit{
  constructor(private userTeacherService: UserTeacherService){}

  scheduleTable: Array<any>=Array(7);
  listSchedules: any = [];

  PeriodsList: any = [];

  period: Period = {
    period_id: 0,
    period_name: '',
    period_start_date: '',
    period_end_date: '',
    period_state: 0
  };
  
  teacher: Teacher = {
    teacher_id: 0,
    teacher_name: '',
    teacher_lastname: '',
    teacher_fullname: '',
    teacher_dnitype: '',
    teacher_dni: '',
    teacher_type: '',
    teacher_contracttype: '',
    teacher_area: '',
    user_login: '',
    user_pwd: ''
  }

  ngAfterViewInit(): void {
    this.listPeriods();
    
    const hours = ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];
    
    for (let i=0; i<15; i++) {
      this.scheduleTable[i] = new Array(7);
    }

    for (let i=0; i<hours.length;i++){
      this.scheduleTable[i][0]=hours[i];
    }

    this.userTeacherService.getInfo().subscribe(
      (res: any) => {
        this.teacher = res[0];
        this.teacher.teacher_fullname=this.teacher.teacher_name + ' '+this.teacher.teacher_lastname;
      },
      err => console.error(err));
  }

  listPeriods(): void {
    this.userTeacherService.listPeriods().subscribe(
      res => {
        this.PeriodsList = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  listSchedulesByPeriod(): void{
    for (let i=0; i<15; i++) {
      for (let j=1; j<7; j++){
        this.scheduleTable[i][j] = undefined;
      }
    }

    for (let i=0;i<this.listSchedules.length;i++){
      this.listSchedules[i]=undefined;
    }

    this.period = {...this.PeriodsList.find((period: Period) => period.period_name === this.period.period_name)};

    this.userTeacherService.getSchedules(this.period.period_id,this.teacher.teacher_id).subscribe(
      res => {
        this.listSchedules = res;
        this.listSchedules.forEach((schedule: Schedule) => {
          this.fillTimeSlot(schedule.schedule_day, schedule.schedule_start_hour, schedule.schedule_end_hour, schedule);
        });
        console.log(this.scheduleTable);
      },
      err => {
        console.log(err);
      }
    );

  }

  fillTimeSlot(day: string, startHour: number, endHour: number, schedule: Schedule){
    let dayIndex: number = 0;
    switch (day) {
      case 'Lunes':
        dayIndex = 1;
        break;
      case 'Martes':
        dayIndex = 2;
        break;
      case 'Miercoles':
        dayIndex = 3;
        break;
      case 'Jueves':
        dayIndex = 4;
        break;
      case 'Viernes':
        dayIndex = 5;
        break;
      case 'Sabado':
        dayIndex = 6;
        break;
    }
    
    for (let i=startHour - 7; i<endHour - 7; i++){
      this.scheduleTable[i][dayIndex] = schedule;
    }
  }
}
