import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { ComponentsModule } from './components/components.module';
import { ServicesModule } from './services/services.module';
import { RoutingModule } from './routing/routing.module';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ComponentsModule,
    ServicesModule,
    RoutingModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
