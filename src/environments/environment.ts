// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    firebase: {
        apiKey: 'AIzaSyAhhrDCPXtS_-uJJQ3UctIogXcgS1ipUJg',
        authDomain: 'arbox-register.firebaseapp.com',
       // databaseURL: 'https://arbox-register.firebaseio.com',
        projectId: 'arbox-register',
        storageBucket: 'arbox-register.appspot.com',
        messagingSenderId: '543664167965',
        appId: '1:543664167965:web:cefd683a6fa74a1db57af4',
        measurementId: 'G-8FXJ0R7Z1R',
        host: 'http://localhost:5001',
        ssl: false,
        databaseURL: 'http://localhost:9000?ns=arbox-register',
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
