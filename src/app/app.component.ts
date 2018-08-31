import { Component, OnInit } from '@angular/core';
import * as firebase  from "firebase";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Books Store'

  ngOnInit(): void{
    firebase.initializeApp({
      apiKey: "AIzaSyDlr_0OTIgk7h-tXEqRUmxZUbk7Jlo-khQ",
      authDomain: "exam-app-687f1.firebaseapp.com",
      databaseURL: "https://exam-app-687f1.firebaseio.com",
      projectId: "exam-app-687f1",
      storageBucket: "exam-app-687f1.appspot.com"
    })
  }
}
