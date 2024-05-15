import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table-crud',
  templateUrl: './table-crud.component.html',
  styleUrl: './table-crud.component.css'
})
export class TableCrudComponent {
  @Input() showActions: boolean = true;
  @Input() headers: string[] = [];
  @Input() attributes: any[] = [];
  @Input() list: any[] = [];
  @Input() editRoute: string= '';
  @Output() parentFunction = new EventEmitter<{id: number, state: number}>();

  childFunction(id: number, state: number){
    this.parentFunction.emit({id,state});
  }
}
