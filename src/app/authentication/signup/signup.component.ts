import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { FormGroup,FormControl, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from '../../../../node_modules/ngx-toastr';
import { Router } from '@angular/router';
import { AppRoutingModule } from "../../routing/app.routing";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm : FormGroup;
  public errMess: string;
  private userNameErrMessages = {
    required: "Please provide a username",
    minLength: "Your user name should be at least 5 characters long"
  };


  constructor(private authServ: AuthService, private signUpFB: FormBuilder, private toastr: ToastrService, private router : Router) {
    //this.model = new SignUpModel("","","","",0);
  }

  ngOnInit() {
    this.signUpForm = this.signUpFB.group({
        username: ["",[Validators.required, Validators.minLength(5)]],
        email: ["",[Validators.required, Validators.email]],
        password: ["",[Validators.required]],
        confirmPass: ["",[Validators.required]],
        termsOfUse: [0,[Validators.required]]
    })
  }

  signUp(){
    if (this.signUpForm.valid){
      this.authServ.signUp(this.signUpForm.get('username').value,this.signUpForm.get('email').value,this.signUpForm.get('password').value);
    }else{
      this.toastr.error("Please enter a valid data in the form and try again.");
    }
    
  }
}
