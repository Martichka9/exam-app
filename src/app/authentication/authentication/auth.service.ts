import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as firebase  from "firebase";
import { Router } from '@angular/router';
import { ToastrService } from '../../../../node_modules/ngx-toastr';

@Injectable()
export class AuthService {
  public tempUser : any;
  public currentUserName: string;
  public usrID : string;
  public token : string;

  constructor(private http : HttpClient,private router: Router, private toastr: ToastrService) {  }

  signUp(userName: string, email: string,password:string){
    this.tempUser = firebase.auth().createUserWithEmailAndPassword(email,password)
    .then((data) => {
      data['additionalUserInfo']['displayName'] = userName;
      firebase.auth().currentUser.updateProfile({displayName: userName, photoURL: ""});
      console.log(data);
      this.router.navigate(['/signin']);
      this.toastr.success("Your registration is successful.");})
    .catch((resError) => this.toastr.error(resError['message']));
    this.tempUser.updateProfile({displayName: 'testme'});
    
  }
  
  signIn(email: string,password:string){
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then((data) => {
      this.currentUserName=data['user']['displayName'];
      localStorage.setItem('usrid',data['user']['uid']);
      firebase.auth().currentUser.getIdToken().then((resToken : string) => {
        this.token = resToken;
        localStorage.setItem('token',this.token);
      }),
      this.router.navigate(['/home']);
    })
    .catch((resError) => this.toastr.error(resError['message']));
  }

  signOut(){
    firebase.auth().signOut();
    this.currentUserName = "";
    this.token = null;
    this.isAuthenticated();
    this.router.navigate(['/signin']);
  }

  isAuthenticated():boolean {
    return this.token != null;
  }
  
  getToken() {
      firebase.auth()
      .currentUser
      .getIdToken()
      .then((token : string) => {
        this.token = token;
      })

    return this.token;
  }

  getUser(){
    return localStorage.getItem('usrid');
  }
}