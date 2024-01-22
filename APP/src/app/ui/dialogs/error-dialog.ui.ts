// error-dialog.component.ts
import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MaterialModule} from "@/_material-ui/material-module/material.module";

@Component({
  standalone: true,
  imports: [MaterialModule],
  selector: 'error-dialog-ui',
  template: `
    <mat-dialog-content>
      <ul>
        <li matError *ngFor="let error of data.errors">{{ error }}</li>
      </ul>
    </mat-dialog-content>
  `,
})
export class ErrorDialogUi {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { errors: string[] }) {
  }
}
