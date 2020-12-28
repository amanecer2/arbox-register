import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MenuController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {merge, Observable, of} from 'rxjs';
import {distinctUntilChanged, filter, map, tap} from 'rxjs/operators';

import {ArboxService} from './core/services/arbox.service';
import {IBoxData, IBoxDataInterface} from '../interface/box';
import {BoxStateService} from './state/boxes/box-state.service';
import {IBoxState} from './state/boxes/box.reducer';
import {backgroung} from './background';
import {BackgroundMode} from '@ionic-native/background-mode/ngx';

import { AngularFireFunctions } from '@angular/fire/functions';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

    public selectedIndex = 0;
    //  public appPages$: Observable<{ title: string, url: string, icon: string }[]>;
    public appPages$: Observable<any>;
    public labels = [];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private arboxService: ArboxService,
        private boxStateService: BoxStateService,
        private backgroundMode: BackgroundMode,
        private menu: MenuController,
        private fns: AngularFireFunctions,
        private firestore: AngularFirestore,
    ) {

        const ref = this.firestore.collection('users').valueChanges();


        ref
            .subscribe( res => {
            // debugger
        });

        this.fns.httpsCallable('onCall')({data: 433242}).subscribe( res => {
            debugger;
        });
        this.fns.httpsCallable('doIt')({data: 433242}).subscribe( res => {
            debugger;
        });

    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    onReady() {
        this.backgroundMode.overrideBackButton();
        // `enable`, `disable`, `activate`, `deactivate` and `failure`
        const onEnable$ = this.backgroundMode.on('enable').pipe(
            tap(enable => console.log('on enable', enable))
        );
        const onDisable$ = this.backgroundMode.on('disable').pipe(
            tap(enable => console.log('on disable', enable))
        );
        const onActivate$ = this.backgroundMode.on('activate').pipe(
            tap(enable => console.log('on activate', enable))
        );
        const onDeactivate$ = this.backgroundMode.on('deactivate').pipe(
            tap(enable => console.log('on deactivate', enable))
        );
        const onFailure$ = this.backgroundMode.on('failure').pipe(
            tap(enable => console.log('on failure', enable))
        );
        const onShahar$ = this.backgroundMode.on('amanecer').pipe(
            tap(enable => console.log('on amanecer', enable))
        );

        this.backgroundMode.un('amanecer', (...args) => {
            debugger;
            console.log('un amanecer', args);
        } );

        merge(
            onEnable$,
            onDisable$,
            onActivate$,
            onDeactivate$,
            onFailure$,
            onShahar$
        ).subscribe();

        console.log('is active? ', this.backgroundMode.isActive());
        console.log('is isEnabled? ', this.backgroundMode.isEnabled());
        if (this.backgroundMode.isEnabled()) {
            this.backgroundMode.moveToBackground();

            setTimeout(() => {
                this.backgroundMode.moveToForeground();
            }, 60000);
        }
        // setTimeout(() => {
        //     this.backgroundMode.fireEvent('amanecer', ['first time after 6 sec', new Date().toISOString()])
        // }, 6000);
        // setTimeout(() => {
        //     this.backgroundMode.fireEvent('amanecer', ['go to background', new Date().toISOString()])
        //
        //     this.backgroundMode.moveToBackground();
        // }, 20000);
        //
        //
        //
        // setTimeout(() => {
        //     debugger
        //     this.backgroundMode.fireEvent('amanecer', ['shahar', 'is', 'the kink'])
        // },  60 * 1000);
        //
        // setTimeout(() => {
        //     debugger
        //     this.backgroundMode.moveToForeground();
        //
        // }, 2 * 60 * 1000);
    }
    ngOnInit() {
        this.appPages$ = this.boxStateService.getState()
            .pipe(
                distinctUntilChanged(),
                filter(x => !!x),
                map((boxes: IBoxState) => {
                        return [...boxes.boxes].map(box => {
                            return {title: box[1].name, url: `app/boxes/${box[1].id}`, icon: 'trash'};
                        });
                    }
                )
            );
    }

    openFirst() {
        this.menu.enable(true, 'first');
        this.menu.open('first');
    }

    openEnd() {
        this.menu.open('end');
    }

    openCustom() {
        this.menu.enable(true, 'custom');
        this.menu.open('custom');
    }
}

/*

membrshipUserFk: 1760311
scheduleFk: 4268885
userFk: 77387*/
