import { Component, OnInit } from '@angular/core';
import { PeriodsService } from '../../../../services/periods.service';
import { TeachersService } from '../../../../services/teachers.service';
import { Period } from '../../../../models/Period';
import { Teacher } from '../../../../models/Teachers';
import { ScheduleService } from '../../../../services/schedule.service';
import { Schedule } from '../../../../models/Schedule';
import { AmbientsService } from '../../../../services/ambients.service';
import { ProgramsService } from '../../../../services/programs.service';
import { Program } from '../../../../models/Program';
import { CompetenciesService } from '../../../../services/competencies.service';
import { Competence } from '../../../../models/Compentence';
import { Ambient } from '../../../../models/Ambient';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule-management',
  templateUrl: './schedule-management.component.html',
  styleUrl: './schedule-management.component.css'
})
export class ScheduleManagementComponent implements OnInit {

  constructor(private periodsService: PeriodsService, private teachersService: TeachersService, private scheduleService: ScheduleService, private ambientsService: AmbientsService, private programsService: ProgramsService, private competenciesService: CompetenciesService, private router: Router) { }

  scheduleTable: Array<any>=Array(7);
  listSchedules: any = [];
  ambientsList: any = [];
  programsList: any = [];
  competenciesList: any = [];
  competenciesGenList: any = [];
  competenciesSpcList: any = [];
  type: number = 0;
  warning: string = '';
  TeacherAndPeriodExist: boolean = false;

  ngOnInit(): void {
    this.listPeriods();
    this.listTeachers();
    this.listAmbients();
    this.listPrograms();
    this.listCompetencies();
    
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

  listPeriods() {
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
    if (this.teacher.teacher_fullname == '' || this.period.period_name == '') {
      this.warning = 'Por favor seleccione un periodo y un docente';
      return;
    }
    this.warning = '';
    for (let i=0; i<15; i++) {
      for (let j=1; j<7; j++){
        this.scheduleTable[i][j] = undefined;
      }
    }

    this.teacher = {...this.TeachersList.find((teacher: Teacher) => teacher.teacher_fullname == this.teacher.teacher_fullname)};
    this.period = {...this.PeriodsList.find((period: Period) => period.period_name == this.period.period_name)}; 

    if (this.teacher && this.period) {
      this.TeacherAndPeriodExist = true;
    } else {
      this.TeacherAndPeriodExist = false;
      return;
    }

    this.scheduleService.listSchedulesByPeriodTeacher(this.period.period_id, this.teacher.teacher_id).subscribe(
      res => {
        this.listSchedules = res;
        let competence;
        let ambient;
        this.listSchedules.forEach((schedule: Schedule) => {
          if(schedule.competence_type == 0) {
            competence = {...this.competenciesGenList.find((competence: Competence) => competence.competence_id == schedule.competence_id)};
          }
          else {
            competence = {...this.competenciesSpcList.find((competence: Competence) => competence.competence_id == schedule.competence_id)};
          }

          ambient = {...this.ambientsList.find((ambient: Ambient) => ambient.ambient_id == schedule.ambient_id)};

          this.fillTimeSlot(schedule.schedule_day, schedule.schedule_start_hour, schedule.schedule_end_hour, ambient.ambient_name, competence.competence_name);
        });
      },
      err => {
        console.log(err);
      }
    );
  }

  fillTimeSlot(day: string, startHour: number, endHour: number, ambient_name: string, competence_name:string){
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
    const auxSchedule = {schedule_start_hour: startHour,
                          schedule_end_hour: endHour,
                          ambient_name: ambient_name,
                          competence_name:competence_name}
    for (let i=startHour - 7; i<endHour - 7; i++){
      this.scheduleTable[i][dayIndex] = auxSchedule;
    }
  }

  listAmbients() {
    this.ambientsService.listAmbients()
    .subscribe(
      res => {
        this.ambientsList = res;
      },
      err => console.error(err)
    );
  }

  listCompetencies() {
    this.competenciesService.listCompetencies().subscribe(
      res => {
        this.competenciesList = res;
        this.competenciesSpcList = this.competenciesList.filter((competence: any) => competence.program_id);
        this.competenciesGenList = this.competenciesList.filter((competence: any) => !competence.program_id);
      },
      err => console.log(err)
    )
  }

  listPrograms() {
    this.programsService.listPrograms()
    .subscribe(
      res => {
        this.programsList = res;
      },
      err => console.error(err)
    )
  }

}
