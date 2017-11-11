import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { GeneralModule } from './general/general.module';
import { RoutingModule } from './routing/routing.module';
import { SharedRouteDataService } from './routing/SharedRouteDataService';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    GeneralModule,
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
