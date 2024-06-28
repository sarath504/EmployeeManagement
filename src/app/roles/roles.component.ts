import { Component, OnInit } from '@angular/core';
import { FiltersComponent } from '../filters/filters.component';
import { RoleService } from '../Services/role.service';
import { Role } from '../Interfaces/role';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [FiltersComponent, CommonModule, RouterLink],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit {
  rolesDetails:any;
  constructor(private roleService : RoleService){}

  ngOnInit(): void {
    this.roleService.getAllRoles().subscribe(
      (role : Role[])=>{this.rolesDetails=role}
    );
  }

  filteredDataFromChildComponent($event : Role){
    this.rolesDetails = $event;
  }
}
