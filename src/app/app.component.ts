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
      apiKey: "<apikey>",
      authDomain: "<authdomain>.firebaseapp.com"
    })
  }
}
