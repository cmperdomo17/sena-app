import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-radio',
  templateUrl: './input-radio.component.html',
  styleUrls: ['./input-radio.component.css']
})
export class InputRadioComponent implements OnInit{
  @Input() label1: string = '';
  @Input() label2: string = '';
  @Input() defaultSelection: string = '';
  @Input() radioValue1: string = '';
  @Input() radioValue2: string = '';
  @Input() radioName: string = '';
  @Input() radioGroupId: string = '';
  @Output() selectionChange = new EventEmitter<string>();

  ngOnInit(){
    setTimeout(() =>{
      this.selectionChange.emit(this.defaultSelection);
    });
  }

  onSelectionChange(selection: string): void {
    this.selectionChange.emit(selection);
  }
}