import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import e from 'cors';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { EnvironmentManagementComponent } from './components/pages/environment-management/environment-management.component';
import { TeachersManagementComponent } from './components/pages/teachers-management/teachers-management.component';
import { ProgramsManagementComponent } from './components/pages/programs-management/programs-management.component';
import { ScheduleManagementComponent } from './components/pages/schedule-management/schedule-management.component';
import { PeriodManagementComponent } from './components/pages/period-management/period-management.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'ambients', component: EnvironmentManagementComponent},
  {path: 'teachers', component: TeachersManagementComponent},
  {path: 'programs', component: ProgramsManagementComponent},
  {path: 'schedules', component: ScheduleManagementComponent},
  {path: 'periods', component: PeriodManagementComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
