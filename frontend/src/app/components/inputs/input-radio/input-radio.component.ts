import { Component, Input, Output, EventEmitter, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-radio',
  templateUrl: './input-radio.component.html',
  styleUrls: ['./input-radio.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputRadioComponent),
      multi: true
    }
  ]
})
export class InputRadioComponent implements OnInit, ControlValueAccessor {
  @Input() label1: string = '';
  @Input() label2: string = '';
  @Input() defaultSelection: string = '';
  @Input() radioValue1: string = '';
  @Input() radioValue2: string = '';
  @Input() radioName: string = '';
  @Input() radioGroupId: string = '';

  @Output() selectionChange = new EventEmitter<string>();

  private onChange = (value: any) => {};
  private onTouched = () => {};

  ngOnInit(){
    setTimeout(() => {
      this.selectionChange.emit(this.defaultSelection);
    });
  }

  onSelectionChange(selection: string): void {
    this.selectionChange.emit(selection);
    this.onChange(selection);
  }

  writeValue(value: any): void {
    this.defaultSelection = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}