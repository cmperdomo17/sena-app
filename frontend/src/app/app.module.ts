import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonDarkmodeComponent } from './components/buttons/button-darkmode/button-darkmode.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginComponent } from './components/pages/login/login.component';
import { SceneryComponent } from './components/pages/scenery/scenery.component';
import { FooterComponent } from './components/footer/footer.component';
import { SigninComponent } from './components/pages/signin/signin.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonDarkmodeComponent,
    HomeComponent,
    LoginComponent,
    SceneryComponent,
    FooterComponent,
    SigninComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
