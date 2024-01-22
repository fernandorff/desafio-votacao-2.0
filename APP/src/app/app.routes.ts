import {Routes} from '@angular/router';
import {LoginPage} from "./pages/login-page/login.page";

export const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'}, // Redirect to login page by default
  {path: 'login', component: LoginPage}
  // Add more routes as needed
];
