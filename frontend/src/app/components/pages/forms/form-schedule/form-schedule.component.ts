import { Component, OnInit, Input } from '@angular/core';
import { Competence } from '../../../../models/Compentence';
import { Program } from '../../../../models/Program';
import { CompetenciesService } from '../../../../services/competencies.service';
import { ProgramsService } from '../../../../services/programs.service';
import { PeriodsService } from '../../../../services/periods.service';
import { TeachersService } from '../../../../services/teachers.service';
import { Teacher } from '../../../../models/Teachers';
import { Period } from '../../../../models/Period';
import { ActivatedRoute, Router } from '@angular/router';
import { Schedule } from '../../../../models/Schedule';
import { ScheduleService } from '../../../../services/schedule.service';
import { Ambient } from '../../../../models/Ambient';
import { AmbientsService } from '../../../../services/ambients.service';


@Component({
  selector: 'app-form-schedule',
  templateUrl: './form-schedule.component.html',
  styleUrl: './form-schedule.component.css'
})

export class FormScheduleComponent implements OnInit {
  constructor(private schedulesService: ScheduleService, private competenciesService: CompetenciesService, private periodsService: PeriodsService, private teachersService: TeachersService, private ambientsService: AmbientsService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params['pId'] && params['tId']) {
      this.teachersService.getTeacher(params['tId'])
        .subscribe(
          (res: any) => {
            this.teacher = res[0];
            this.teacher.teacher_fullname = this.teacher.teacher_name + ' ' + this.teacher.teacher_lastname;
          },
          err => console.error(err)
        )
      this.periodsService.getPeriod(params['pId'])
        .subscribe(
          (res: any) => {
            this.period = res[0];
          },
          err => console.error(err)
        )
    }
    else {
      console.error('No se recibio el identificador del periodo o del profesor.');
    }

    this.listAmbients();
    this.listCompetencies();
  }

  schedule: Schedule = {
    schedule_id: 0,
    ambient_id: '',
    teacher_id: 0,
    period_id: 0,
    competence_id: 0,
    competence_type: 0,
    schedule_day: '',
    schedule_start_hour: 0,
    schedule_end_hour: 0,
    schedule_duration: 0
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

  competenciesList: any = [];
  competenciesGenList: any = [];
  competenciesSpcList: any = [];
  competenceType: string = '';

  ambienstList: any = [];

  ProgramsList: any = [];
  scheduleDays: any = [
    { day: "Lunes" },
    { day: "Martes" },
    { day: "Miercoles" },
    { day: "Jueves" },
    { day: "Viernes" },
    { day: "Sabado" }
  ];

  warning: string = '';

  selectedOption: string = '';

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

  onSelectionChangeType(selection: string) {
    this.competenceType = selection;
  }

  listCompetencies() {
    this.competenciesService.listCompetencies().subscribe(
      res => {
        this.competenciesList = res;
        console.log(this.listCompetencies);
        this.competenciesSpcList = this.competenciesList.filter((competence: any) => competence.program_id);
        this.competenciesGenList = this.competenciesList.filter((competence: any) => !competence.program_id);
      },
      err => console.log(err)
    )
  }

  listAmbients() {
    this.ambientsService.listAmbients().subscribe(
      res => {
        this.ambienstList = res;
      },
      err => console.error(err)
    )
  }

  saveNewSchedule() {
    if (this.schedule.schedule_start_hour == 0 ||
      this.schedule.schedule_duration == 0 ||
      this.schedule.schedule_day == '' ||
      this.competence.competence_name == ''
    ) {
      this.warning = 'Por favor ingresa todos los campos';
      return;
    }

    // Validar que solo se ingrese una opcion que exista en la lista de ambientes
    if (!this.ambienstList.find((ambient: any) => ambient.ambient_id == this.schedule.ambient_id)) {
      this.warning = 'El ambiente del horario no es valido';
      return;
    }

    // Validar que solo se ingrese una opcion que exista en la lista de dias
    if (!this.scheduleDays.find((dayO: any) => dayO.day == this.schedule.schedule_day)) {
      this.warning = 'El día del horario no es valido';
      return;
    }

    // Validar que solo se ingrese una opcion que exista en la lista de competencias
    if (!this.competenciesList.find((competence: any) => competence.competence_name == this.competence.competence_name)) {
      this.warning = 'El nombre de la competencia no es valido';
      return;
    }

    if (this.schedule.schedule_duration < 1) {
      this.warning = 'La duración del horario no es valida';
      return;
    }

    //Calcular la hora de terminación teniendo en cuenta la duración
    this.schedule.schedule_end_hour = Number(this.schedule.schedule_start_hour) + Number(this.schedule.schedule_duration);

    //Validar que la hora de inicio este dentro de las posibles
    if (this.schedule.schedule_start_hour < 7 || this.schedule.schedule_start_hour > 22) {
      this.warning = 'La hora de inicio ingresada no es valida';
      return;
    }

    if (this.schedule.schedule_end_hour > 22) {
      this.warning = 'La franja horaria se sale del horario laboral';
      console.log(this.schedule.schedule_end_hour);
      return;
    }

    let auxCompetence;
    if (this.competenceType == 'Genérica') {
      auxCompetence = this.competenciesGenList.find((competence: Competence) => competence.competence_name == this.competence.competence_name);
    }
    else {
      auxCompetence = this.competenciesSpcList.find((competence: Competence) => competence.competence_name == this.competence.competence_name);
    }

    this.schedule.competence_id = auxCompetence.competence_id;
    this.schedule.competence_type = auxCompetence.competence_type;


    this.schedulesService.createSchedule(this.schedule).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/schedules']);
      },
      err => console.log(err)
    )
  }
}