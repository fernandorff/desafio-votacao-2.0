import {Component} from "@angular/core";
import {MaterialModule} from "@/_material-ui/material-module/material.module";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {zodValidator} from "@/validators/zod/zodValidator";
import {emailSchema} from "@/validators/zod/schemas";

@Component({
  selector: 'app-email-form-control',
  imports: [MaterialModule, ReactiveFormsModule],
  template: `
    <mat-form-field class="w-full">
      <mat-label>E-mail</mat-label>
      <input [formControl]="formControl" matInput placeholder="Insert your e-mail">
    </mat-form-field>
  `,
  standalone: true
})
export class EmailFormControlUi {
  formControl = emailFormControl
}

export const emailFormControl = new FormControl('', [Validators.required, zodValidator(emailSchema)]);
