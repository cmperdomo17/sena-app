import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-radio',
  templateUrl: './input-radio.component.html',
  styleUrl: './input-radio.component.css'
})
export class InputRadioComponent {

  @Input() label1: string = '';
  @Input() label2: string = '';
}
