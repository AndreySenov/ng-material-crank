import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';

import { RoutingModule } from './routing/routing.module';
import { SharedRouteDataService } from './routing/SharedRouteDataService';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    MaterialModule,
    RoutingModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    SharedRouteDataService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
