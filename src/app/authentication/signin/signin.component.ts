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
  private temp = {};
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

  usrRole(){
    this.authServ.role().snapshotChanges().subscribe(usr => {
      this.temp = usr.payload.val();
      if(this.temp !== null){
        if(this.temp['isAdmin']){
          this.isADMN = true
        }
      }else{this.isADMN = false;}
    },err => {this.isADMN = false;});
    this.isAdmin();
  }

  isAdmin(){
    this.authServ.isAdmin(this.isADMN);
    return this.isADMN;
  }

  ngOnDestroy() {
  }
}
