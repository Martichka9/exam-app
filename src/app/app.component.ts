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
      apiKey: "AIzaSyBylcd4JfhWe7Ml3yJiH13zZZz2WbNzcW0",
      authDomain: "exam-app-bc38c.firebaseapp.com",
      databaseURL: "https://exam-app-bc38c.firebaseio.com",
      projectId: "exam-app-bc38c",
      storageBucket: "exam-app-bc38c.appspot.com"
    })
  }
}
