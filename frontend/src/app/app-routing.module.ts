import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import e from 'cors';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AmbientsManagementComponent } from './components/pages/managements/ambients-management/ambients-management.component';
import { TeachersManagementComponent } from './components/pages/managements/teachers-management/teachers-management.component';
import { ProgramsManagementComponent } from './components/pages/managements/programs-management/programs-management.component';
import { ScheduleManagementComponent } from './components/pages/managements/schedule-management/schedule-management.component';
import { PeriodManagementComponent } from './components/pages/managements/period-management/period-management.component';
import { CompetenciesManagementComponent } from './components/pages/managements/competencies-management/competencies-management.component';
import { FormAmbientComponent } from './components/pages/forms/form-ambient/form-ambient.component';
import { FormCompetenceComponent } from './components/pages/forms/form-competence/form-competence.component';
import { FormScheduleComponent } from './components/pages/forms/form-schedule/form-schedule.component';
import { UserViewComponent } from './components/pages/user-view/user-view.component';
import { FormTeacherComponent } from './components/pages/forms/form-teacher/form-teacher.component';
import { FormProgramComponent } from './components/pages/forms/form-program/form-program.component';
import { FormPeriodComponent } from './components/pages/forms/form-period/form-period.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'ambients', component: AmbientsManagementComponent},
  {path: 'teachers', component: TeachersManagementComponent},
  {path: 'programs', component: ProgramsManagementComponent},
  {path: 'schedules', component: ScheduleManagementComponent},
  {path: 'periods', component: PeriodManagementComponent},
  {path: 'competencies', component: CompetenciesManagementComponent},
  {path: 'ambients/form', component: FormAmbientComponent},
  {path: 'ambients/form/:id',component: FormAmbientComponent},
  {path: 'competencies/form', component: FormCompetenceComponent},
  {path: 'competencies/form/0/:id', component: FormCompetenceComponent},
  {path: 'competencies/form/1/:id', component: FormCompetenceComponent},
  {path: 'schedules/form/:tId/:pId', component: FormScheduleComponent},
  {path: 'teachers/form', component: FormTeacherComponent},
  {path: 'teachers/form/:id', component: FormTeacherComponent},
  {path: 'programs/form', component: FormProgramComponent},
  {path: 'programs/form/:id', component: FormProgramComponent},
  {path: 'periods/form', component: FormPeriodComponent},
  {path: 'periods/form/:id', component: FormPeriodComponent},
  {path: 'user', component: UserViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
