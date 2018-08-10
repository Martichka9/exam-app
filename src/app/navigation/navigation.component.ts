import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authentication/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private authServ: AuthService, private router: Router) { }

  ngOnInit() {
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(['/signin']);
  }
}
