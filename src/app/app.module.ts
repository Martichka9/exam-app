import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrService, ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AuthenticationModule } from './authentication/authentication/authentication.module';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './routing/app.routing';
import { AuthService } from './authentication/authentication/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { TermsOfUseComponent } from './authentication/terms-of-use/terms-of-use.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { BooksModule } from './books/books.module';
import { BooksRoutingModule } from './routing/books.routings';

import { environment } from "./environments/environment"
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreModule } from '../../node_modules/angularfire2/firestore';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    TermsOfUseComponent
  ],
  imports: [
    BrowserModule,
    ToastrModule.forRoot(),
    AuthenticationModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BooksModule,
    BooksRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule
  ],
  providers: [
    ToastrService,
    ReactiveFormsModule,
    AuthService,{ 
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
