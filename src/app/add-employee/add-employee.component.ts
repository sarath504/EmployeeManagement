import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../Services/employee.service';
import { Employee } from '../Interfaces/employee';
import { Project } from '../Interfaces/project';
import { Department } from '../Interfaces/department';
import { Role } from '../Interfaces/role';


@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, CommonModule, FormsModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
  providers: [DatePipe]
})
export class AddEmployeeComponent implements OnInit {

  isFormSubmitted : boolean=false;
  isSubmitted : boolean=false;
  locations : any;
  projects : Project[]=[];
  roles : Role[]=[];
  departments : Department[]=[];
  employeeData:any;
  id : string
  employee:any;
  isEdit:boolean=false;
  buttonText:string;
  message:string='';
  imageBase64Url : string | ArrayBuffer | undefined | null = '';
  defaultImage : string | ArrayBuffer | undefined | null = "assets/profile.png";
  isImageUploaded:boolean=false;
  constructor(private empService:EmployeeService, private router : Router,public activatedRoute : ActivatedRoute,
    public datePipe : DatePipe){
    this.id=activatedRoute.snapshot.paramMap.get('id')!;
    if(this.id ==null){
      this.buttonText="Add Employee";
    }
    else{
      this.buttonText = "Update Employee";
    }
  }
  
  ngOnInit(){
      this.empService.getAllLocations().subscribe(
        loc=>{this.locations=loc}
      );

      this.empService.getAllProjects().subscribe(
        project=>{this.projects=project;}
      );

      this.empService.getAllEmployees().subscribe(
        emp=>{this.employeeData=emp}
      );

      this.empService.getAllRoles().subscribe(
      role=>{this.roles=role}
    );

    this.empService.getAllDepartments().subscribe(
      dept=>{this.departments=dept}
    );

      if(this.id !=null){
        this.empService.getEmployeeById(this.id).subscribe(
          emp=>{
            this.employee=emp;
            this.employeeInformation.patchValue({
              Id : this.employee.id,
              FirstName : this.employee.firstName,
              LastName : this.employee.lastName,
              Dob : this.datePipe.transform(this.employee.dob,'yyyy-MM-dd'),
              EmailId : this.employee.emailId,
              Mobile : this.employee.mobile,
              JoinDate : this.datePipe.transform(this.employee.joinDate,'yyyy-MM-dd') ,
              Location : this.employee.locationId,
              Role : this.employee.roleId,
              Department : this.employee.departmentId,
              Manager : this.employee.manager,
              Project : this.employee.projectId,
            });
            this.defaultImage =emp.image;
            this.isImageUploaded=true;
          }
        )
      }
      
    }

  employeeInformation = new FormGroup({
    Id : new FormControl('',[
      Validators.required,
      Validators.pattern(/^TZ\d{4}$/)
    ]),
    FirstName : new FormControl('',[
      Validators.required,
      Validators.pattern(/^[a-zA-Z\s]*$/)
    ]),
    LastName : new FormControl('',[
      Validators.required,
      Validators.pattern(/^[a-zA-Z\s]*$/)
    ]),
    Name : new FormControl(''),
    Dob : new FormControl('',[
      Validators.required,
      Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)
    ]),
    EmailId : new FormControl('',[
      Validators.required,
      Validators.email
    ]),
    Mobile : new FormControl('',[
      Validators.pattern(/^[0-9]{10}$/)
    ]),
    JoinDate : new FormControl('',[
      Validators.required,
      Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)
    ]),
    Location : new FormControl('',[
      Validators.required
    ]),
    Role : new FormControl('',[
      Validators.required
    ]),
    Department : new FormControl('',[
      Validators.required,
    ]),
    Manager : new FormControl(''),
    Project : new FormControl(''),
    Image : new FormControl('')
  });

  

  onSubmit(){
    console.log(this.employeeInformation.value);
    var fullName = this.employeeInformation.value.LastName+ " " +this.employeeInformation.value.FirstName;
    this.employeeInformation.patchValue({
      Name : fullName,
    });
    var employee : Employee={
      id : this.convertNullUndefinedToEmptyStrings(this.employeeInformation.value.Id),
      firstName : this.convertNullUndefinedToEmptyStrings(this.employeeInformation.value.FirstName),
      lastName : this.convertNullUndefinedToEmptyStrings(this.employeeInformation.value.LastName),
      name : this.convertNullUndefinedToEmptyStrings(this.employeeInformation.value.Name),
      emailId : this.convertNullUndefinedToEmptyStrings(this.employeeInformation.value.EmailId),
      locationId : parseInt(this.convertNullUndefinedToEmptyStrings(this.employeeInformation.value.Location)),
      departmentId : parseInt(this.convertNullUndefinedToEmptyStrings(this.employeeInformation.value.Department)),
      roleID : parseInt(this.convertNullUndefinedToEmptyStrings(this.employeeInformation.value.Role)),
      mobile : this.convertNullUndefinedToEmptyStrings(this.employeeInformation.value.Mobile),
      dob : this.convertNullUndefinedToEmptyStrings(this.employeeInformation.value.Dob),
      joinDate : this.convertNullUndefinedToEmptyStrings(this.employeeInformation.value.JoinDate),
      manager : this.convertNullUndefinedToEmptyStrings(this.employeeInformation.value.Manager),
      projectId : parseInt(this.convertNullUndefinedToEmptyStrings(this.employeeInformation.value.Project)),
      statusId : 1,
      image : this.defaultImage
    }
    this.isFormSubmitted=true;
    if(this.employeeInformation.valid){
      if(this.id==null){
        this.empService.addEmployee(employee);
        console.log(employee);
        this.isSubmitted=true;
        this.message="Data Added Successfully"
        setTimeout(()=>{
          this.router.navigateByUrl('');
        },3000);
      }
      else{
        this.message="Data Updated Successfully"
        this.empService.updateEmployee(employee);
        setTimeout(()=>{
          this.router.navigateByUrl('/home/employees');
        },3000);
      }
      
    }
  }

  convertNullUndefinedToEmptyStrings(value:string | null | undefined){
    return value!==null && value!==undefined ? value : '';
  }

  onLocationChange(event : Event){
    var location = parseInt((event.target as HTMLSelectElement).value);
    // this.empService.getAllRolesByLocation(location).subscribe(
    //   role=>{this.roles=role}
    // );

    // this.empService.getAllDepartments().subscribe(
    //   dept=>{this.departments=dept}
    // );

  }

  onImageUpload(event : Event){
    this.isImageUploaded=true;
    var target = event.target as HTMLInputElement;
    if(target.files?.[0]){
      var image = target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(image)
      reader.addEventListener('load',(e)=>{
      this.defaultImage = e.target?.result;
      })
    }
  }
}
