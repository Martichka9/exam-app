import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ToastrService } from '../../../../node_modules/ngx-toastr';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit,OnDestroy {
  signInForm: FormGroup;
  isADMN = false;
  //OBS

  constructor(private authServ : AuthService, private signInFB: FormBuilder,private toastr: ToastrService) {}

  ngOnInit() {
    this.signInForm = this.signInFB.group({
    email: ["",[Validators.required]],
    password: ["",[Validators.required]]
})
  }
  
  signIn(){
    this.authServ.signIn(this.signInForm.get('email').value,this.signInForm.get('password').value);
    
  }

  ngOnDestroy() {
    
  }
}
