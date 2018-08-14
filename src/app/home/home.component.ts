import { Component, OnInit } from '@angular/core';
import { AuthService } from "../authentication/authentication/auth.service";
import { BooksComponent } from "../books/books/books.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authServ : AuthService) { }

  ngOnInit() {
  }

}
