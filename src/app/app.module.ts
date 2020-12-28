import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {CoreModule} from './core/core.module';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StoreModule} from '@ngrx/store';
import {reducers} from './state';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';

import {boxesReducer} from "./state/boxes/box.reducer";
import {AngularFireModule, } from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireFunctions} from "@angular/fire/functions";

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        CoreModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        StoreModule.forRoot(reducers, /*{
            runtimeChecks: {
                strictActionImmutability: true,
                strictActionSerializability: true,
                strictStateImmutability: true,
                strictStateSerializability: true
            }
        }*/),
        AngularFireModule.initializeApp(environment.firebase)
    ],
    providers: [
        StatusBar,
        SplashScreen,
        BackgroundMode,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        AngularFireFunctions,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(functions: AngularFireFunctions){
        functions.useFunctionsEmulator('http://localhost:5000');
    }
}
