import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

declare const ENV: string;

ENV === 'production' && enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule);
