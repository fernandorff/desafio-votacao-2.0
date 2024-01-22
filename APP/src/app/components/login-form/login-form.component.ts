import {Component} from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from "@/_material-ui/material-module/material.module";
import {passwordFormControl, PasswordFormControlUi} from "@/ui/form-controls/password-form-control.ui";
import {emailFormControl, EmailFormControlUi} from "@/ui/form-controls/email-form-control.ui";

@Component({
  selector: 'app-login-form',
  standalone: true,
  template: `
    <form #f="ngForm" (ngSubmit)="handleLogin()" [formGroup]="loginForm">
      <h3>Insert your user credentials to access</h3>

      <app-email-form-control/>

      <app-password-form-control/>

      <div class="mt-4 w-full flex justify-between">
        <button color="accent" mat-button type="button">Create Account</button>
        <button color="primary" mat-raised-button type="submit">Login</button>
      </div>
    </form>
  `,
  imports: [
    ReactiveFormsModule, MaterialModule, PasswordFormControlUi, EmailFormControlUi
  ]
})
export class LoginFormComponent {
  loginForm = new FormGroup({
    email: emailFormControl,
    password: passwordFormControl
  });

  showPassword = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  handleLogin(): void {
    console.log(this.loginForm.controls['email'].errors['zodError'] && this.loginForm.controls['email'].errors['zodError'])

    console.log('Form value:', this.loginForm.value);
    console.log('Is form valid:', this.loginForm.valid);
  }
}
