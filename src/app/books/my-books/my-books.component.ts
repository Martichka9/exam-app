import { Component, OnInit } from '@angular/core';
import { BooksService } from '../books.service';
import { map } from "rxjs/operators";
import { AuthService } from '../../authentication/authentication/auth.service';


@Component({
  selector: 'app-my-books',
  templateUrl: './my-books.component.html',
  styleUrls: ['./my-books.component.css']
})
export class MyBooksComponent implements OnInit {
  booksList: any;
 
  constructor(private bServ : BooksService,private authServ : AuthService) { }
 
  ngOnInit() {
    this.loadMyList();
  }
  
  loadMyList(){
    
  }

}
