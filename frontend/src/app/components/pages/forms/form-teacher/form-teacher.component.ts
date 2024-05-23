import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Teacher } from '../../../../models/Teachers';
import { TeachersService } from '../../../../services/teachers.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-form-teacher',
  templateUrl: './form-teacher.component.html',
  styleUrl: './form-teacher.component.css'
})
export class FormTeacherComponent implements OnInit{
  
  edit: boolean=false;
  dniTypes:any=[];
  defaultTeacherType: string = '';
  defaultTeacherContractType: string = '';
  warning: string = '';
  success: string = '';

  teacher: Teacher = {
    teacher_id:0,
    teacher_name:'',
    teacher_lastname:'',
    teacher_fullname:'',
    teacher_dnitype:'',
    teacher_dni:'',
    teacher_type:'',
    teacher_contracttype:'',
    teacher_area:'',
    user_login:'',
    user_pwd:''
  }

  constructor(private teacherService: TeachersService, private router: Router, private activatedRoute: ActivatedRoute, private cdr: ChangeDetectorRef) {
  }

  listTeachers: any = [];

  ngOnInit(): void {

    this.teacherService.listTeachers()
    .subscribe(
      (res: any) => {
        this.listTeachers = res;            
      },
      err => console.error(err)
    )

    this.listDniTypes();
    const params = this.activatedRoute.snapshot.params;
    if (params['id']){
      this.teacherService.getTeacher(params['id'])
        .subscribe(
          (res: any) => {
            this.teacher = res[0];            
            this.edit = true;
          },
          err => console.error(err)
        )
    }
  }

  onSelectionChangeType(selection: string) {
    this.teacher.teacher_type = selection;
  }

  onSelectionChangeCType(selection: string):void{
    this.teacher.teacher_contracttype = selection;
  }

  listDniTypes(){
    this.dniTypes=[{typeName: "RC"}, 
                  {typeName: "TI"},
                  {typeName: "CC"},
                  {typeName: "TE"},
                  {typeName: "CE"},
                  {typeName: "NIT"},
                  {typeName: "PP"},
                  {typeName: "PEP"},
                  {typeName: "DIE"},
                  {typeName: "NUIP"},
                  {typeName: "FOREIGN_NIT"}];
  }

  showSuccessMessage(message: string) {
    this.success = message;
    setTimeout(() => {
      this.success = '';
      this.cdr.detectChanges();
      this.router.navigate(['/teachers']);
    }, 2000);
  }

  saveNewTeacher(){
    console.log(this.teacher.teacher_type);
    console.log(this.teacher.teacher_contracttype);
    

    if(this.teacher.teacher_name=='' ||
      this.teacher.teacher_lastname=='' || 
      this.teacher.teacher_dnitype=='' ||
      this.teacher.teacher_dni=='' ||
      this.teacher.teacher_type=='' ||
      this.teacher.teacher_contracttype=='' ||
      this.teacher.teacher_area=='' ||
      this.teacher.user_login=='' ||
      this.teacher.user_pwd==''
    ) 
    {
      this.warning = 'Por favor ingresa todos los campos';
      return;
    }

    // Validar que el nombre y apellido del profesor no tenga numeros
    if (this.teacher.teacher_name.match(/\d/) || this.teacher.teacher_lastname.match(/\d/)) {
      this.warning = 'El nombre y apellido no pueden contener números';
      return;
    } 

    // Validar que solo se ingrese una opcion que exista en la lista de DNI
    if (!this.dniTypes.find((type: any) => type.typeName == this.teacher.teacher_dnitype)) {
      this.warning = 'El tipo de documento no es valido';
      return;
    }

    const fullname = this.teacher.teacher_name + ' ' + this.teacher.teacher_lastname;

    if (this.listTeachers.find((teacher: Teacher) => (teacher.teacher_name + ' ' + teacher.teacher_lastname) == fullname)) {
      this.warning = 'El profesor: ' + fullname + ' ya existe';
      return;
    }

    this.teacherService.createTeacher(this.teacher).subscribe(
      res=>{
        console.log(res);
        this.showSuccessMessage('Profesor creado correctamente');
      },
      err=>console.log(err)
    )
  }

  updateTeacher(){
    this.teacherService.updateTeacher(this.teacher.teacher_id,this.teacher).subscribe(
      res=>{
        console.log(res);
        this.showSuccessMessage('Profesor actualizado correctamente');
      },
      err=>console.log(err)
    )
  }

}
