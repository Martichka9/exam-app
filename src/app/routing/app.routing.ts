import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from '../authentication/signin/signin.component';
import { SignupComponent } from '../authentication/signup/signup.component';
import { HomeComponent } from '../home/home.component';
import { TermsOfUseComponent } from '../authentication/terms-of-use/terms-of-use.component';
import { BooksModule } from '../books/books.module';

const routes : Routes = [
    //{ path: 'home', component: HomeComponent },
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'home', component: HomeComponent },
    { path: 'signin', component: SigninComponent},
    { path: 'signup', component: SignupComponent },
    { path: 'terms-of-use', component: TermsOfUseComponent },
    { path: 'books', loadChildren: () => BooksModule }
  ]
  
@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
  })
  export class AppRoutingModule {  }