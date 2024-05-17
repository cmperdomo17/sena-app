import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-inactivate',
  templateUrl: './button-inactivate.component.html',
  styleUrl: './button-inactivate.component.css'
})
export class ButtonInactivateComponent {
  @Input() isActivate: boolean = false;
}
