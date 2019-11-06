import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material from '@angular/material';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Material.MatToolbarModule,
    Material.MatIconModule,
    Material.MatBadgeModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatCardModule,
    Material.MatDialogModule,
  ],
  exports:[
    Material.MatToolbarModule,
    Material.MatIconModule,
    Material.MatButtonModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatCardModule,
    Material.MatDialogModule,
  ],
})
export class MaterialModule { }
