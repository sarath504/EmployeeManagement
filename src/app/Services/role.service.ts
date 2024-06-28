import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Role } from '../Interfaces/role';
import { Employee } from '../Interfaces/employee';
import { filtersInterface } from '../Interfaces/filtersInterface';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http:HttpClient) { }

  getAllRoles(){
    return this.http.get<Role[]>('https://localhost:7110/api/Roles');
  }

  addRole(role : Role){
    return this.http.post<Role[]>('https://localhost:7110/api/Roles', role).subscribe();
  }

  getEmployeesByRoleId(Id : number){
    return this.http.get<Employee[]>(`https://localhost:7110/api/Roles/Id?id=${Id}`);
  }

  getRoleById(Id : number){
    return this.http.get<Role>(`https://localhost:7110/api/Roles/Role/Id?id=${Id}`);
  }

  updateRole(role : Role){
    return this.http.put<Role[]>('https://localhost:7110/api/roles',role);
  }

  filterRoles(filterParams:filtersInterface){
    return this.http.post<Role>('https://localhost:7110/api/Roles/FilterRoles', filterParams);
  }
}
