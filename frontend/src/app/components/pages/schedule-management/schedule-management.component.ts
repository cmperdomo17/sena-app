import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PeriodsService } from '../../../services/periods.service';
import { TeachersService } from '../../../services/teachers.service';
import { Period } from '../../../models/Period';
import { Teacher } from '../../../models/Teachers';

@Component({
  selector: 'app-schedule-management',
  templateUrl: './schedule-management.component.html',
  styleUrl: './schedule-management.component.css'
})
export class ScheduleManagementComponent implements OnInit {

  constructor(private periodsService: PeriodsService, private teachersService: TeachersService) { }

  ngOnInit(): void {
    this.listPeriods();
    this.listTeachers();
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
  selectedOption: string = '';
  teacherFullName: string = '';
  
  onSelectionChange(selection: string): void {
    this.selectedOption = selection;
  }

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

}
