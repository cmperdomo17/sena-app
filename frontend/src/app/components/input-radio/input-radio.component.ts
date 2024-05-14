import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-radio',
  templateUrl: './input-radio.component.html',
  styleUrls: ['./input-radio.component.css']
})
export class InputRadioComponent {
  @Input() label1: string = '';
  @Input() label2: string = '';
  @Input() defaultSelection: string = '';
  @Output() selectionChange = new EventEmitter<string>();

  onSelectionChange(selection: string): void {
    this.selectionChange.emit(selection);
  }
}