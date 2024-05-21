import { Component, OnInit } from '@angular/core';
import { PeriodsService } from '../../../../services/periods.service';
import { TeachersService } from '../../../../services/teachers.service';
import { Period } from '../../../../models/Period';
import { Teacher } from '../../../../models/Teachers';
import { ScheduleService } from '../../../../services/schedule.service';
import { Schedule } from '../../../../models/Schedule';

@Component({
  selector: 'app-schedule-management',
  templateUrl: './schedule-management.component.html',
  styleUrl: './schedule-management.component.css'
})
export class ScheduleManagementComponent implements OnInit {

  constructor(private periodsService: PeriodsService, private teachersService: TeachersService, private scheduleService: ScheduleService) { }

  scheduleTable: Array<any>=Array(7);
  listSchedules: any = [];

  ngOnInit(): void {
    this.listPeriods();
    this.listTeachers();
    const hours = ['7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'];
    
    for (let i=0; i<15; i++) {
      this.scheduleTable[i] = new Array(7);
    }

    for (let i=0; i<hours.length;i++){
      this.scheduleTable[i][0]=hours[i];
    }
  }

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

  PeriodsList: any = [];
  TeachersList: any = [];
  teacherFullName: string = '';

  listPeriods(): void {
    this.periodsService.listPeriods().subscribe(
      res => {
        this.PeriodsList = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  listTeachers(): void {
    this.teachersService.listTeachers().subscribe(
      res => {
        this.TeachersList = res;
        this.TeachersList.forEach((teacher: Teacher) => {
          teacher.teacher_fullname = teacher.teacher_name + ' ' + teacher.teacher_lastname;
        });
      },
      err => {
        console.log(err);
      }
    );
  }

  findScheduleByPeriodTeacher(): void {
    for (let i=0; i<15; i++) {
      for (let j=1; j<7; j++){
        this.scheduleTable[i][j] = undefined;
      }
    }

    this.teacher = {...this.TeachersList.find((teacher: Teacher) => teacher.teacher_fullname == this.teacher.teacher_fullname)};
    this.period = {...this.PeriodsList.find((period: Period) => period.period_name == this.period.period_name)}; 
    
    this.scheduleService.listSchedulesByPeriodTeacher(this.period.period_id, this.teacher.teacher_id).subscribe(
      res => {
        this.listSchedules = res;
        this.listSchedules.forEach((schedule: Schedule) => {
          this.fillTimeSlot(schedule.schedule_day, schedule.schedule_start_hour, schedule.schedule_end_hour, schedule);
        });
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
