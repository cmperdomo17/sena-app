import { Component, Input } from '@angular/core';

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
}
