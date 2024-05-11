import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-input-options',
  templateUrl: './input-options.component.html',
  styleUrl: './input-options.component.css'
})
export class InputOptionsComponent {
  @Input() options: string[] = [];
  @Input() placeholder: string = '';
  @Input() listId: string = '';
}
