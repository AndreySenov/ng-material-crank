import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from './material.module';
import { PhotoCard } from './photo-card.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    PhotoCard
  ],
  exports: [
    MaterialModule,
    PhotoCard
  ]
})
export class ComponentsModule { }
