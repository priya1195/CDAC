import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { User } from '../../classes/User';
import { Role } from 'src/app/classes/Role';
import { Customer } from 'src/app/classes/Customer';
import { Restaurent } from 'src/app/classes/Restaurent';
import { Admin } from 'src/app/classes/Admin';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user = new User();
  regmsg='';
  userError:User;
  isCreated:boolean=false;
  userExist:boolean=false;
  customer=new Customer();
  restaurent=new Restaurent();
  admin=new Admin();

  constructor(private service : LoginService,private router : Router) { }

  ngOnInit(): void {
  }

  addCustomer(){
    this.customer.name=this.user.name;
    this.customer.email=this.user.email;
    this.customer.address=this.user.address;
    this.service.addCustomer(this.customer).subscribe(
      data=>
      {
        console.log(data);
      },
      error=>
      {
        console.log("Exception");
       }
    )
  }

  addRestaurent(){
    this.restaurent.name=this.user.name;
    this.restaurent.email=this.user.email;
    this.restaurent.address=this.user.address;
    this.service.addRestaurent(this.restaurent).subscribe(
      data=>
      {
        console.log(data);
      },
      error=>
      {
        console.log("Exception");
       }
    )
  }

  addAdmin(){
    this.admin.name=this.user.name;
    this.admin.email=this.user.email;
    this.admin.address=this.user.address;
    this.service.addAdmin(this.admin).subscribe(
      data=>
      {
        console.log(data);
      },
      error=>
      {
        console.log("Exception");
       }
    )
  }
  onRegistrationclick(){
    this.service.registerUser(this.user).subscribe(

        data=>
        {
          console.log(data);
          console.log("role:" + data.role);
           if(data.role=="CUSTOMER")
            this.addCustomer();
           else
            if(data.role=="RESTAURENT")
            this.addRestaurent();
            else
            if(data.role=="ADMIN")
            this.addAdmin(); 
          this.user=new User(); //reset fields
          this.isCreated=true;
          this.userExist=false;
          this.userError=new User();
          window.alert("Registration done !!");

        },
        error=>
        {
          this.userError=error.error; 
          this.isCreated=false;

          if(error.status == 409){
            this.isCreated=false;
            this.userExist=true;
            this.userError=new User();
           // this.user=new User();
            

          }       
        
          console.log("Exception:{}",error);
        
      }

    )

}
}
