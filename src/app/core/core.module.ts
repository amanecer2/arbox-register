import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {HttpInterceptorService} from "./interseptors/interceptor.service";

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule
  ],
  exports: [

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
  ]
})
export class CoreModule { }
