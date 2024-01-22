import {Component} from '@angular/core';
import {LoginFormComponent} from "@/components/login-form/login-form.component";
import {MaterialModule} from "@/_material-ui/material-module/material.module";

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginFormComponent, MaterialModule],
  template: `
    <div class="flex w-full h-dvh justify-center items-center" style="background-image: url('/assets/login-bg.jpg')">
      <mat-card class="p-8">
        <div class="flex justify-center mb-4"><h1>Welcome to VotingApp</h1></div>
        <app-login-form/>
      </mat-card>
    </div>`,
})
export class LoginPage {

}
