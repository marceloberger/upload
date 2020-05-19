import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { appReducers } from './store/app.reducers';

import { EffectsModule } from '@ngrx/effects';

import { EffectsArray } from './store/effects/index';



@NgModule({
  declarations: [
    AppComponent,
    UploadFileComponent,


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot( appReducers ),
    EffectsModule.forRoot( EffectsArray ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
