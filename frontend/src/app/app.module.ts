import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonDarkmodeComponent } from './components/buttons/button-darkmode/button-darkmode.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { FooterComponent } from './components/others/footer/footer.component';
import { AmbientsManagementComponent } from './components/pages/managements/ambients-management/ambients-management.component';
import { TeachersManagementComponent } from './components/pages/managements/teachers-management/teachers-management.component';
import { ProgramsManagementComponent } from './components/pages/managements/programs-management/programs-management.component';
import { SidebarComponent } from './components/others/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/others/header/header.component';
import { PeriodManagementComponent } from './components/pages/managements/period-management/period-management.component';
import { ScheduleManagementComponent } from './components/pages/managements/schedule-management/schedule-management.component';
import { FormAmbientComponent } from './components/pages/forms/form-ambient/form-ambient.component';
import { FormCompetenceComponent } from './components/pages/forms/form-competence/form-competence.component';
import { ControlSideBarComponent } from './components/others/control-side-bar/control-side-bar.component';
import { InputComponent } from './components/inputs/input/input.component';
import { ButtonSaveComponent } from './components/buttons/button-save/button-save.component';
import { InputCheckboxComponent } from './components/inputs/input-checkbox/input-checkbox.component';
import { InputRadioComponent } from './components/inputs/input-radio/input-radio.component';
import { ButtonComponent } from './components/buttons/button/button.component';
import { InputOptionsComponent } from './components/inputs/input-options/input-options.component';
import { FormScheduleComponent } from './components/pages/forms/form-schedule/form-schedule.component';
import { ButtonSearchComponent } from './components/buttons/button-search/button-search.component';
import { TableCrudComponent } from './components/tables/table-crud/table-crud.component';
import { TableScheduleComponent } from './components/tables/table-schedule/table-schedule.component';
import { ButtonInactivateComponent } from './components/buttons/button-inactivate/button-inactivate.component';
import { ButtonEditComponent } from './components/buttons/button-edit/button-edit.component';
import { UserViewComponent } from './components/pages/user-view/user-view.component';
import { FormsModule } from '@angular/forms';
import { LoginService } from './services/login.service';
import { CompetenciesManagementComponent } from './components/pages/managements/competencies-management/competencies-management.component';
import { FormTeacherComponent } from './components/pages/forms/form-teacher/form-teacher.component';
import { FormProgramComponent } from './components/pages/forms/form-program/form-program.component';
import { FormPeriodComponent } from './components/pages/forms/form-period/form-period.component';
import { InputDateComponent } from './components/inputs/input-date/input-date.component';
import { ConfirmMessageComponent } from './components/others/confirm-message/confirm-message.component';
import { SuccessMessageComponent } from './components/others/success-message/success-message.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonDarkmodeComponent,
    HomeComponent,
    LoginComponent,
    FooterComponent,
    AmbientsManagementComponent,
    TeachersManagementComponent,
    ProgramsManagementComponent,
    CompetenciesManagementComponent,
    SidebarComponent,
    HeaderComponent,
    PeriodManagementComponent,
    ScheduleManagementComponent,
    FormAmbientComponent,
    FormCompetenceComponent,
    ControlSideBarComponent,
    InputComponent,
    ButtonSaveComponent,
    InputCheckboxComponent,
    InputRadioComponent,
    ButtonComponent,
    InputOptionsComponent,
    FormScheduleComponent,
    ButtonSearchComponent,
    TableCrudComponent,
    TableScheduleComponent,
    ButtonInactivateComponent,
    ButtonEditComponent,
    UserViewComponent,
    FormTeacherComponent,
    FormProgramComponent,
    FormPeriodComponent,
    InputDateComponent,
    ConfirmMessageComponent,
    SuccessMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    LoginService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
