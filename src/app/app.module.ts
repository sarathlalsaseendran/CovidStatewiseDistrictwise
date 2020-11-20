import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';  
import { MatDatepickerModule } from '@angular/material/datepicker';  
import { MatFormFieldModule } from '@angular/material/form-field';  
import { MatNativeDateModule } from '@angular/material/core';  
import { MatSelectModule } from '@angular/material/select';   
import { DatePipe } from '@angular/common';  
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,  
    MatFormFieldModule,  
    MatDatepickerModule,  
    MatNativeDateModule,  
    MatSelectModule  
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
