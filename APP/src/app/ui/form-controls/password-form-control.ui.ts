import {Component} from "@angular/core";
import {MaterialModule} from "@/_material-ui/material-module/material.module";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {zodValidator} from "@/validators/zod/zodValidator";
import {passwordSchema} from "@/validators/zod/schemas";

@Component({
  selector: 'app-password-form-control',
  imports: [MaterialModule, ReactiveFormsModule],
  standalone: true,
  template: `
    <mat-form-field class="w-full">
      <mat-label>Password</mat-label>
      <input [formControl]="formControl" matInput placeholder="Insert your password"
             type="{{ showPassword ? 'text' : 'password' }}" autocomplete="off">
      <button mat-icon-button matSuffix (click)="togglePasswordVisibility()" type="button">
        <mat-icon>{{ showPassword ? 'visibility_off' : 'visibility' }}</mat-icon>
      </button>
    </mat-form-field>
  `,
})
export class PasswordFormControlUi {
  formControl = passwordFormControl

  showPassword = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}

export const passwordFormControl = new FormControl('', [Validators.required, zodValidator(passwordSchema)]);

