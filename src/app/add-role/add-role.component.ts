import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../Services/employee.service';
import { Role } from '../Interfaces/role';
import { RoleService } from '../Services/role.service';
import { RouterLink,ActivatedRoute } from '@angular/router';
import { Department } from '../Interfaces/department';
import { Employee } from '../Interfaces/employee';

@Component({
  selector: 'app-add-role',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './add-role.component.html',
  styleUrl: './add-role.component.css'
})
export class AddRoleComponent implements OnInit {
  isSubmitted : boolean=false;
  isFormSubmitted : boolean=false;
  locations : any;
  departments : Department[]=[];
  employees : Employee[]=[];
  isEmployeesVisible:boolean = false;
  buttonContent : string = 'Add Role'
  roleId : number = 0;
  role : any;

  constructor(private empService : EmployeeService, 
    private roleService : RoleService, 
    private activatedRoute : ActivatedRoute){}

  ngOnInit(): void {
    this.empService.getAllLocations().subscribe(
      loc=>{this.locations=loc}
    );

    this.empService.getAllDepartments().subscribe(
      dept=>{this.departments=dept}
    );

    this.empService.getAllEmployees().subscribe(
      emp=>{this.employees=emp}
    );

    this.roleId = parseInt(this.activatedRoute.snapshot.paramMap.get('id') ?? '0',10)
    if(this.roleId!=0){
      this.buttonContent='Update Role';
      this.roleService.getRoleById(this.roleId).subscribe(
        role=>{this.role=role;
          
          this.roleInformation.patchValue(
            {
              roleName : this.role.name,
              location : this.role.locationId,
              department : this.role.departmentId,
              description : this.role.description,
        });
      });
    }
    else{
      this.buttonContent='Add Role'
    }
  }

  roleInformation = new FormGroup({
    roleName : new FormControl('',[
      Validators.required
    ]),
    department : new FormControl('',[
      Validators.required
    ]),
    description : new FormControl(''),
    location : new FormControl('',[
      Validators.required
    ]),
    employees : new FormControl('',[])
  });


  onSubmit(){
    var role : Role ={
      roleID : this.roleId,
      name  : this.roleInformation.value.roleName ? this.roleInformation.value.roleName : '',
      locationId : parseInt(this.convertNullUndefinedToEmptyStrings(this.roleInformation.value.location)),
      departmentId :  parseInt(this.convertNullUndefinedToEmptyStrings(this.roleInformation.value.department)),
      description : this.roleInformation.value.description ? this.roleInformation.value.description : ''
   };
   console.log(this.roleInformation.value);
    if(this.roleId!=0){
      console.log(role);
      this.roleService.updateRole(role).subscribe();
    }
    else{
      this.isFormSubmitted = true;
    if(this.roleInformation.valid){
      this.roleService.addRole(role);
      this.isSubmitted =true;
    }
    }
  }

  onFocus(){
    this.isEmployeesVisible=!this.isEmployeesVisible;
  }

  convertNullUndefinedToEmptyStrings(value:string | null | undefined){
    return value!==null && value!==undefined ? value : '';
  }

}
