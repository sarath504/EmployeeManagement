import { Component, Output, EventEmitter } from '@angular/core';
import { EmployeeService } from '../Services/employee.service';
import { filtersInterface } from '../Interfaces/filtersInterface';
import { NgFor, NgStyle,NgClass, NgIf } from '@angular/common';
import { Employee } from '../Interfaces/employee';
import { Router } from '@angular/router';
import { RoleService } from '../Services/role.service';
import { Role } from '../Interfaces/role';
import { Status } from '../Interfaces/Status';
import { Department } from '../Interfaces/department';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [NgFor, NgStyle,NgClass, NgIf],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent {
  @Output() filteredData = new EventEmitter<Employee>();
  @Output() filteredRolesData = new EventEmitter<Role>();

  employeeDetails:any;
  rolesDetails! : Role;
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
  alphabets:string[] = [];
  clickedLetter:string='';
  status : Status[]=[];
  location : any;
  department : Department[]=[];
  isAlphabetFilterVisible:boolean=true;
  isStatusDropdownVisible:boolean=true;

  constructor(private empService:EmployeeService, private route : Router, private rolesService:RoleService){}


  ngOnInit(): void {
    this.empService.getAllEmployees().subscribe(
      employee=>{
        this.employeeDetails=employee;
      });
  
      this.empService.getAllLocations().subscribe(
        loc=>{this.location=loc}
      );
      this.empService.getAllDepartments().subscribe(
        dept=>{this.department=dept}
      );
        
      this.empService.getAllStatus().subscribe(
        st=>{this.status=st}
      );
      for(let i:number = 65; i <= 90; i++) {
        this.alphabets.push(String.fromCharCode(i));
      }

      const routeUrl = this.route.url;
    if(routeUrl ==='/home/roles'){
      this.isAlphabetFilterVisible=false;
      this.isStatusDropdownVisible=false;
    }
    else{
      this.isAlphabetFilterVisible=true;
      this.isStatusDropdownVisible=true;
    }
  
  }
  
    locationDropdown(){
      this.isLocationClicked=!this.isLocationClicked;
      this.isDepartmentClicked=false;
      this.isStatusClicked=false;
    }  
  
    departmentDropdown(){
      this.isDepartmentClicked=!this.isDepartmentClicked;
      this.isStatusClicked=false;
      this.isLocationClicked=false;
    }
  
    statusDropdown(){
      this.isStatusClicked=!this.isStatusClicked;
      this.isDepartmentClicked=false;
      this.isLocationClicked=false;
    }
  
    
  
    isSelectedStatus(status:string,event:any){
      if(event.target.checked){
        console.log(event.target.checked);
        this.statusCount=this.statusCount+1;
        this.selectedStatus.push(status);
      }
      else{
        const index=this.selectedStatus.indexOf(status);
        if(index!=-1){
          this.selectedStatus.splice(index,1);
        }
        this.statusCount=this.statusCount-1;
      }
      if(this.locationCount>0 || this.statusCount>0 || this.departmentCount>0){
        this.isDisabled=false;
      }
      else{
        this.isDisabled=true;
      }
    }
  
    isSelectedLocation(location:string,event:any){
      if(event.target.checked){
        this.locationCount=this.locationCount+1;
        this.selectedLocation.push(location);
      }
      else{
        const index=this.selectedLocation.indexOf(location);
        if(index!=-1){
          this.selectedLocation.splice(index,1);
        }
        this.locationCount=this.locationCount-1;
        
      }
      if(this.locationCount>0 || this.statusCount>0 || this.departmentCount>0){
        this.isDisabled=false;
      }
      else{
        this.isDisabled=true;
      }
    }
  
    isSelectedDepartment(department:string,event:any){
      if(event.target.checked){
        this.departmentCount=this.departmentCount+1;
        this.selectedDepartment.push(department);
      }
      else{
        const index=this.selectedDepartment.indexOf(department);
        if(index!=-1){
          this.selectedDepartment.splice(index,1);
        }
        this.departmentCount=this.departmentCount-1;
      }
      if(this.locationCount>0 || this.statusCount>0 || this.departmentCount>0){
        this.isDisabled=false;
      }
      else{
        this.isDisabled=true;
      }
    }

  IsClick(letter:string){
    this.empService.filterByAlphabet(this.clickedLetter,letter).subscribe(
      employee=>{this.employeeDetails=employee;
        this.filteredData.emit(this.employeeDetails);}
    );
      this.clickedLetter=this.clickedLetter===letter?'':letter;  
  }

    applyFilters(){
      const filterParams:filtersInterface={
        letter:this.clickedLetter,
        status:this.selectedStatus,
        location:this.selectedLocation,
        department:this.selectedDepartment
      }

    const routeUrl = this.route.url;
    if(routeUrl ==='/home/roles'){
      this.rolesService.filterRoles(filterParams).subscribe(
        roles=>{this.rolesDetails=roles;
        this.filteredRolesData.emit(this.rolesDetails);
      });
    }
    else{
      this.empService.filterByDropdownValues(filterParams).subscribe(
        employee=>{
          this.employeeDetails=employee;
          this.filteredData.emit(this.employeeDetails);
        }); 
    }
  }

}
