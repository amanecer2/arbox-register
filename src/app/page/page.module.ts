import {NgModule, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';
import {BoxStateService} from "../state/boxes/box-state.service";
import {Router} from "@angular/router";
import {take, tap} from "rxjs/operators";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PageRoutingModule
  ]
})
export class PageModule implements OnInit{
  constructor(boxStateService: BoxStateService, router: Router){
  }
  ngOnInit(): void {
    debugger
  } }
