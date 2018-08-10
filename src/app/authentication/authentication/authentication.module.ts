import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { authComponents } from '../index';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    ...authComponents
  ],
  providers: [
    AuthService
  ]

})
export class AuthenticationModule { }
