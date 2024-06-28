import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { HeaderComponent } from '../header/header.component';
import { EmployeesComponent } from '../employees/employees.component';
import { NgStyle } from '@angular/common';
import { LoginComponent } from '../login/login.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, SidenavComponent, HeaderComponent, EmployeesComponent,NgStyle, LoginComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title = 'EmployeeManagement';
  message:boolean=false;
  receiveMessage(isHandleClicked:boolean){
    this.message=isHandleClicked;
  }
}
