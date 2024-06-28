import { Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeesComponent } from './employees/employees.component';
import { RolesComponent } from './roles/roles.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { RoleDetailsComponent } from './role-details/role-details.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path:'',redirectTo:'/login',pathMatch:"full"},
    {path:'login', component:LoginComponent},
    {path:'home', component:HomeComponent, children:[
        {path:'employees',component:EmployeesComponent},
        {path:'addemployee',component:AddEmployeeComponent},
        {path:'roles',component:RolesComponent},
        {path:'addemployee/:id',component:AddEmployeeComponent},
        {path:'addrole',component:AddRoleComponent},
        {path:'roledetails', component:RoleDetailsComponent},
        {path:'roledetails/:id', component:RoleDetailsComponent},
        {path: 'roles/addrole/:id', component:AddRoleComponent}
    ]}
    
];
