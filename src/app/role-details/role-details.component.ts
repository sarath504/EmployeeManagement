import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../Services/employee.service';
import { Employee } from '../Interfaces/employee';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RoleService } from '../Services/role.service';

@Component({
  selector: 'app-role-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './role-details.component.html',
  styleUrl: './role-details.component.css'
})
export class RoleDetailsComponent implements OnInit {
  employees : Employee[]=[];
  Id : number = 0;
  constructor(private roleService : RoleService, private activatedRoute : ActivatedRoute){
    this.Id = parseInt(this.activatedRoute.snapshot.paramMap.get('id') ?? '0', 10);
  }

    ngOnInit(): void {
      this.roleService.getEmployeesByRoleId(this.Id).subscribe(
        employee=>{this.employees=employee;
        console.log(employee)}
      );
  }
}
