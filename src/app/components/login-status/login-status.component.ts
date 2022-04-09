import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated:boolean;
  userfulName:string;
  constructor(private oktaAuthService:OktaAuthService) { }

  ngOnInit(): void {
    // subscribe to authentication state changes
    this.oktaAuthService.$authenticationState.subscribe(
      result =>{
        this.isAuthenticated = result;
        this.getUserDetails();
      }
    );
  }
  getUserDetails() {
    // only is user is authicated
    if(this.isAuthenticated){

      this.oktaAuthService.getUser().then(res => {
        this.userfulName = res.name;
      })
    }
  }
  logout(){
    // terminate the sesssion wuth okta removes current toekn 
    this.oktaAuthService.signOut();
  }

}
