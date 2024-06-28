import { Component, Output,EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink} from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [NgIf,RouterLink],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  @Output() message = new EventEmitter<boolean>();
  isAlphabetsFilterDisplayed : boolean=true;
  isRolesActive : boolean = false;
  isEmployeesActive : boolean =false;
  currentUrl : string='';
  isHandleClicked: boolean=false;

  constructor(){};
  employeesClick(){
    this.isRolesActive = false;
    this.isEmployeesActive = true;
  }

  rolesClick(){
    this.isRolesActive = true;
    this.isEmployeesActive = false;
  }

  sideNavClose(){
    this.isHandleClicked=!this.isHandleClicked;
    this.message.emit(this.isHandleClicked)
  }

}
