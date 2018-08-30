import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as firebase  from "firebase";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class AuthService {
  private dbPath = "/userProfs"
  public tempUser : any;
  private currUser = "";
  public currentUserName: string;
  public token : string;
  private isADMN = false;
  public obsADMN : any;
  private temp = {
    isAdmin: false
  };

  constructor(private http : HttpClient,private router: Router, private toastr: ToastrService,
    private db: AngularFireDatabase) { }

  signUp(userName: string, email: string,password:string){
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then((data) => {
      data['additionalUserInfo']['displayName'] = userName;
      this.currUser = data['user']['uid'];
      this.db.database.ref().child(`${this.dbPath}/${this.currUser}`).set(this.temp)
      .then(res => {
        console.log(res)
      },res => console.log(res)).catch(error => console.log(error));
      console.log(this.currUser);
      firebase.auth().currentUser.updateProfile({displayName: userName, photoURL: ""});
      this.router.navigate(['/signin']);
      this.toastr.success("Your registration is successful.");})
    .catch((resError) => console.log(resError));
    this.temp.isAdmin = true;
    
  }
  
  signIn(email: string,password:string){
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then((data) => {
      this.currentUserName=data['user']['displayName'];
      this.isADMN=data['user']['isAdmin'];
      localStorage.setItem('usrid',data['user']['uid']);
      this.currUser = firebase.auth().currentUser.uid;
      console.log(data);
      firebase.auth().currentUser.getIdToken().then((resToken : string) => {
        this.token = resToken;
        localStorage.setItem('token',this.token);
      }),
      this.router.navigate(['/home']);
    })
    .catch((resError) => this.toastr.error(resError['message']));
    
    console.log(this.db.database.ref().child(`${this.dbPath}/${this.currUser}/isAdmin`));
  }

  signOut(){
    firebase.auth().signOut();
    this.currentUserName = undefined;
    this.currUser = undefined;
    this.token = undefined;
    this.isADMN = false;
    //this.isAuthenticated();
    localStorage.clear();
    this.router.navigate(['/signin']);
  }

  isAuthenticated():boolean {
    return this.token != null;
  }
  
  isAdmin(){
    console.log(this.db.database.ref().child(`${this.dbPath}/${this.currUser}/isAdmin`));
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