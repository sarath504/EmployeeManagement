import { Component,OnInit } from '@angular/core';
import { EmployeeService } from '../Services/employee.service';
import { CommonModule, NgClass,NgFor,NgStyle} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import * as XLSX from 'xlsx';
import { FiltersComponent } from '../filters/filters.component';
import { Employee } from '../Interfaces/employee';
import { Status } from '../Interfaces/Status';
import { Department } from '../Interfaces/department';



@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, NgClass, NgFor, NgStyle,RouterLink, FormsModule, FiltersComponent],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent implements OnInit {

  employeeDetails:any;
  alphabets:string[] = [];
  allSelected: boolean = false;
  selectedRows: boolean[] = [];
  isThreeDotsClicked:boolean[]=[];

  

  constructor(private empService:EmployeeService){}

  locationCount:number=0;
  statusCount:number=0;
  departmentCount:number=0;
  isDisabled:boolean=true;
  selectedStatus:string[]=[];
  selectedLocation:string[]=[];
  selectedDepartment:string[]=[];
  isLocationClicked=false;
  isDepartmentClicked=false;
  isStatusClicked=false;
  filteredData!:Employee;
  status : Status[]=[];
  location : any;
  department : Department[]=[];

 ngOnInit(): void {
  this.empService.getAllEmployees().subscribe(
    employee=>{
      console.log(employee);
      this.employeeDetails=employee;

       this.selectedRows = new Array(this.employeeDetails.length).fill(false);  
       this.isThreeDotsClicked = new Array(this.employeeDetails.length).fill(false);
    });

    for(let i:number = 65; i <= 90; i++) {
      this.alphabets.push(String.fromCharCode(i));
    }

    this.empService.getAllLocations().subscribe(
      loc=>{this.location=loc}
    );
    this.empService.getAllDepartments().subscribe(
      dept=>{this.department=dept}
    );
      
    this.empService.getAllStatus().subscribe(
      st=>{this.status=st}
    );

  }

  toggleAllRows(){
    this.selectedRows.fill(this.allSelected);
    if(this.allSelected){
      this.enableDeleteButton=false;
    }
    else{
      this.enableDeleteButton=true;
    }
  }

  enableDeleteButton:boolean=true;
  checkIfAllSelected() {
    this.allSelected = this.selectedRows.every(selected => selected);
    if(this.selectedRows.some(selected => selected)){
      this.enableDeleteButton=false;
    }
    else{
      this.enableDeleteButton=true;
    }
  }

  filteredDataFromChild($event:Employee){
    this.filteredData=$event;
    this.employeeDetails=this.filteredData;
  }

  
  deleteEmployees(){
   const indexes:number[]=[];
  const ids:string[]=[];
    for(let i:number=0;i<this.selectedRows.length;i++){
      if(this.selectedRows[i]){
        indexes.push(i);
      }
    }
    this.selectedRows.fill(false);
    for(let i:number=0;i<indexes.length;i++){
      ids.push(this.employeeDetails[indexes[i]].id);
    }

    this.empService.deleteEmployees(ids).subscribe(
      employee=>{
        this.employeeDetails=employee;
      }
    );
    this.enableDeleteButton=true;
  }

  deleteEmployee(empId:string){
    return this.empService.deleteEmployees([empId]).subscribe(
      emp=>{
        this.employeeDetails=emp;
      }
    );

  }


  threeDotsClicked(empId:string){
    for(let i:number=0;i<this.employeeDetails.length;i++){
      if(this.employeeDetails[i].id==empId){
        this.isThreeDotsClicked[i]=!this.isThreeDotsClicked[i];
      }
      else{
        this.isThreeDotsClicked[i]=false;
      }
    }
  }


  sortOrder: { [key: string]: 'asc' | 'desc' } = {
    user : 'desc',
    location : 'desc',
    department : 'desc',
    role : 'desc',
    empNo : 'desc',
    status : 'desc',
    joinDate : 'desc'
  };

  sortData(key:string){

    this.sortOrder[key]=this.sortOrder[key]==='asc' ? 'desc' : 'asc';
    this.empService.sortEmployees(key,this.sortOrder[key]).subscribe(
      emp=>{this.employeeDetails=emp}
    );
  }

  exportToExcel(){
    const workSheet:XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.employeeDetails);
    const workBook:XLSX.WorkBook={Sheets:{'employees':workSheet}, SheetNames:['employees']};
    XLSX.writeFile(workBook,'employees.xlsx');
  }


}
