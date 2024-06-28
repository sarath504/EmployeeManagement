import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Employee } from '../Interfaces/employee';
import { filtersInterface } from '../Interfaces/filtersInterface';
import { Project } from '../Interfaces/project';
import { Role } from '../Interfaces/role';
import { Department } from '../Interfaces/department';
import { Status } from '../Interfaces/Status';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employees:Employee[]=[];
  constructor(public http:HttpClient) { }

  private getHeaders(): HttpHeaders {
    const authToken = localStorage.getItem('jwt');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`
    });
  }
  getAllEmployees(){
    return this.http.get<Employee[]>("https://localhost:7110/api/Employee/Employees", {headers : this.getHeaders()});
  }

  getAllLocations(){
    return this.http.get<Location[]>("https://localhost:7110/api/Employee/Locations");
  }

  getAllProjects(){
    return this.http.get<Project[]>('https://localhost:7110/api/Employee/Projects');
  }

  getAllRoles(){
    return this.http.get<Role[]>('https://localhost:7110/api/Roles');
  }

  getAllRolesByLocation(location:number){
    return this.http.get<Role[]>(`https://localhost:7110/api/Roles/location?location=${location}`);
  }

  getAllDepartments(){
    return this.http.get<Department[]>('https://localhost:7110/api/Employee/Departments');
  }

  getAllStatus(){
    return this.http.get<Status[]>('https://localhost:7110/api/Employee/Status');
  }

  getEmployeeById(id:string){
    return this.http.get<Employee>(`https://localhost:7110/api/Employee/Id?id=${id}`);
  }

  filterByAlphabet(clickedLetter: string, letter: string) {
    if(clickedLetter===letter){
      return this.http.get<Employee[]>("https://localhost:7110/api/Employee/Employees");
    }
    else{
      return this.http.get<Employee[]>(`https://localhost:7110/api/Employee/FilterByAlphabet?letter=${letter}`);
    }
  }

  filterByDropdownValues(filterParams:filtersInterface){
    return this.http.post("https://localhost:7110/api/Employee/FilterData",filterParams);
  }

  deleteEmployees(id:string[]){
    return this.http.delete("https://localhost:7110/api/Employee",{body:id});
  }

  sortEmployees(key:string,ascending:string){
    return this.http.get<Employee[]>(`https://localhost:7110/api/Employee/Sort?key=${key}&ascending=${ascending}`);
  }

  addEmployee(emp:Employee){
    this.http.post("https://localhost:7110/api/Employee",emp).subscribe();
  }

  updateEmployee(emp:Employee){
    this.http.put('https://localhost:7110/api/Employee',emp).subscribe();
  }
}
