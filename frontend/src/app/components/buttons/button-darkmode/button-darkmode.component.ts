import { Component } from '@angular/core';

@Component({
  selector: 'app-button-darkmode',
  templateUrl: './button-darkmode.component.html',
  styleUrl: './button-darkmode.component.css'
})
export class ButtonDarkmodeComponent {
  darkMode = false;

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    if (this.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}
