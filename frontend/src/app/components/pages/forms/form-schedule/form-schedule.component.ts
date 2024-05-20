import { Component, OnInit, Input } from '@angular/core';
import { Competence } from '../../../../models/Compentence';
import { Program } from '../../../../models/Program';
import { CompetenciesService } from '../../../../services/competencies.service';
import { ProgramsService } from '../../../../services/programs.service';
import { PeriodsService } from '../../../../services/periods.service';
import { TeachersService } from '../../../../services/teachers.service';
import { Teacher } from '../../../../models/Teachers';
import { Period } from '../../../../models/Period';

@Component({
  selector: 'app-form-schedule',
  templateUrl: './form-schedule.component.html',
  styleUrl: './form-schedule.component.css'
})

export class FormScheduleComponent implements OnInit {
  constructor(private competenciesService: CompetenciesService, private programsService: ProgramsService, private periodsService: PeriodsService, private teachersService: TeachersService) {}

  ngOnInit(): void {
    this.listPrograms();
    this.listCompetences();
  }

  competence: Competence = {
    competence_id: 0,
    program_id: null,
    competence_name: '',
    competence_state: 0
  };

  program: Program = {
    program_id: 0,
    program_name: '',
    program_state: 0
  };

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

  CompetencesList: any = [];
  ProgramsList: any = [];
  selectedOption: string = '';
  @Input() value: string = '';

  selectedTeacher: Teacher = {
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
  };

  onTeacherSelected(teacher: Teacher) {
    this.selectedTeacher = teacher;
  }

  onSelectionChange(selection: string): void {
    this.selectedOption = selection;
  }

  listCompetences(): void {
    this.competenciesService.listCompetencies().subscribe(
      res => {
        this.CompetencesList = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  listPrograms(): void {
    this.programsService.listPrograms().subscribe(
      res => {
        this.ProgramsList = res;
      },
      err => {
        console.log(err);
      }
    );
  }
}