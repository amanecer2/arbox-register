import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MenuController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {Observable, throwError} from 'rxjs';
import {catchError, distinctUntilChanged, filter, map, tap} from 'rxjs/operators';

import {ArboxService} from './core/services/arbox.service';
import {BoxStateService} from './state/boxes/box-state.service';
import {IBoxState} from './state/boxes/box.reducer';
import {BackgroundMode} from '@ionic-native/background-mode/ngx';

import { AngularFireFunctions } from '@angular/fire/functions';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {


    public selectedIndex = 0;
    public appPages = [
        {
            title: 'Inbox',
            url: '/folder/Inbox',
            icon: 'mail'
        },
        {
            title: 'Outbox',
            url: '/folder/Outbox',
            icon: 'paper-plane'
        },
        {
            title: 'Favorites',
            url: '/folder/Favorites',
            icon: 'heart'
        },
        {
            title: 'Archived',
            url: '/folder/Archived',
            icon: 'archive'
        },
        {
            title: 'Trash',
            url: '/folder/Trash',
            icon: 'trash'
        },
        {
            title: 'Spam',
            url: '/folder/Spam',
            icon: 'warning'
        }
    ];
    public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

    //  public apnpPages$: Observable<{ title: string, url: string, icon: string }[]>;
    public appPages$: Observable<any>;

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
        private router: Router
    ) {

    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    ngOnInit() {

        this.arboxService.isUserRegister()

            .pipe(
                catchError( err => {
                    debugger
                    this.router.navigate(['auth/login']);
                    return throwError(err);
                }),
                tap( _ => {
                    debugger
                    this.arboxService.getUserSchedules().subscribe()
                })
            )
            .subscribe();


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
}

/*

membrshipUserFk: 1760311
scheduleFk: 4268885
userFk: 77387*/
