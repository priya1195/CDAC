import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { User } from '../../classes/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User();
  msg='';

  constructor(private service : LoginService,private router : Router) { }

  ngOnInit(): void {
  }

  onLogin()
  {
    this.service.loginUser(this.user).subscribe
            (
            responseData=>
            {
            console.log("response received");
            //console.log(this.user.address);
            console.log("role:" + responseData.role);
            if(responseData.role=="CUSTOMER")
            this.router.navigate(["/customer-view"]);
            else
            if(responseData.role=="RESTAURENT")
            this.router.navigate(["/supplier-view"]);
            else
            if(responseData.role=="ADMIN")
            this.router.navigate(["/admin-view"]);                                   
            },
            error=>
            {console.log("Exception");
            this.msg="Bad Credentials, Please enter valid email Or password";
            }

            )

  }
}
