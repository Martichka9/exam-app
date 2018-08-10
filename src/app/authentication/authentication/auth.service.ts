import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignUpModel } from '../../models/signup.model';
import { SignInModel } from '../../models/signin.model';
import * as firebase  from "firebase";
import { Router } from '@angular/router';
import { ToastrService } from '../../../../node_modules/ngx-toastr';

@Injectable()
export class AuthService {
  public currentUserName: string;
  public token : string;

  constructor(private http : HttpClient,private router: Router, private toastr: ToastrService) {  }

  signUp(userName: string, email: string,password:string){
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then((data) => {data['displayName']=userName;
    this.router.navigate['/signin'];
    this.toastr.success("Your registration is successful.");})
    .catch((resError) => this.toastr.error(resError['message']));
  }
  
  signIn(email: string,password:string){
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then((data) => {this.currentUserName=data['displayName'];
      firebase.auth().currentUser.getIdToken().then((token : string) => {
        this.token = data['token'];
      })
    console.log(data)})
    .catch((resError) => this.toastr.error(resError['message']));
    this.router.navigate['/home']
  }

  signOut(){
    firebase.auth().signOut();
    this.token = null;
    this.router.navigate['/signin'];
  }

  isAuthenticated():boolean {
    return this.token != null;
  }
}