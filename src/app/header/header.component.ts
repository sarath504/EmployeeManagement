import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../Services/employee.service';
import { Employee } from '../Interfaces/employee';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  employeeDetails:Employee[]=[];
  filteredEmployees:Employee[]=[];
  query : string=[]='';
  divDisplay : boolean = false;

  constructor(private empService : EmployeeService){}

  ngOnInit(): void {
    this.empService.getAllEmployees().subscribe(
      emp=>{this.employeeDetails=emp}
    );
  }
  

  searchEmployees(){
    if(this.query.length>0){
      this.divDisplay=true;
    } 
    else{
      this.divDisplay=false;
    }
    this.filteredEmployees = this.employeeDetails.filter(emp=>emp.name.toLowerCase().includes(this.query.toLowerCase()));
    console.log(this.filteredEmployees);
  }
}
