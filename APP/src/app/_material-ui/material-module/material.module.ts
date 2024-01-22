import {NgModule} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {CommonModule} from "@angular/common";

const MATERIAL_MODULES = [CommonModule, MatFormFieldModule, MatInputModule, MatCardModule, MatIcon, MatIconButton, MatButton, MatDialogModule]

@NgModule({
  imports: MATERIAL_MODULES,
  exports: MATERIAL_MODULES
})
export class MaterialModule {

}
