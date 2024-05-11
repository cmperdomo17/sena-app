import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import e from 'cors';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AmbientsManagementComponent } from './components/pages/ambients-management/ambients-management.component';
import { TeachersManagementComponent } from './components/pages/teachers-management/teachers-management.component';
import { ProgramsManagementComponent } from './components/pages/programs-management/programs-management.component';
import { ScheduleManagementComponent } from './components/pages/schedule-management/schedule-management.component';
import { PeriodManagementComponent } from './components/pages/period-management/period-management.component';
import { CompetencesManagementComponent } from './components/pages/competences-management/competences-management.component';
import { FormAmbientComponent } from './components/pages/form-ambient/form-ambient.component';
import { FormCompetenceComponent } from './components/pages/form-competence/form-competence.component';
import { FormScheduleComponent } from './components/pages/form-schedule/form-schedule.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'ambients', component: AmbientsManagementComponent},
  {path: 'teachers', component: TeachersManagementComponent},
  {path: 'programs', component: ProgramsManagementComponent},
  {path: 'schedules', component: ScheduleManagementComponent},
  {path: 'periods', component: PeriodManagementComponent},
  {path: 'competences', component: CompetencesManagementComponent},
  {path: 'ambients/form', component: FormAmbientComponent},
  {path: 'competences/form', component: FormCompetenceComponent},
  {path: 'schedules/form', component: FormScheduleComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
