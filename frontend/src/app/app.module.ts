import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonDarkmodeComponent } from './components/buttons/button-darkmode/button-darkmode.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { AmbientsManagementComponent } from './components/pages/ambients-management/ambients-management.component';
import { TeachersManagementComponent } from './components/pages/teachers-management/teachers-management.component';
import { ProgramsManagementComponent } from './components/pages/programs-management/programs-management.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { PeriodManagementComponent } from './components/pages/period-management/period-management.component';
import { ScheduleManagementComponent } from './components/pages/schedule-management/schedule-management.component';
import { CompetencesManagementComponent } from './components/pages/competences-management/competences-management.component';
import { FormAmbientComponent } from './components/pages/form-ambient/form-ambient.component';
import { FormCompetenceComponent } from './components/pages/form-competence/form-competence.component';
import { ControlSideBarComponent } from './components/control-side-bar/control-side-bar.component';
import { InputComponent } from './components/input/input.component';
import { ButtonSaveComponent } from './components/buttons/button-save/button-save.component';
import { InputCheckboxComponent } from './components/input-checkbox/input-checkbox.component';
import { InputRadioComponent } from './components/input-radio/input-radio.component';
import { ButtonComponent } from './components/buttons/button/button.component';
import { InputOptionsComponent } from './components/input-options/input-options.component';
import { FormScheduleComponent } from './components/pages/form-schedule/form-schedule.component';
import { ButtonSearchComponent } from './components/buttons/button-search/button-search.component';
import { TableCrudComponent } from './components/table-crud/table-crud.component';
import { TableScheduleComponent } from './components/table-schedule/table-schedule.component';
import { ButtonInactivateComponent } from './components/buttons/button-inactivate/button-inactivate.component';
import { ButtonEditComponent } from './components/buttons/button-edit/button-edit.component';
import { UserViewComponent } from './components/pages/user-view/user-view.component';
import { FormsModule } from '@angular/forms';
import { LoginService } from './services/login.service';

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
    SidebarComponent,
    HeaderComponent,
    PeriodManagementComponent,
    ScheduleManagementComponent,
    CompetencesManagementComponent,
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
    UserViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
