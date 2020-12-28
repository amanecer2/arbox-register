import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {ArboxService} from "../../services/arbox.service";
import {FormControl, FormGroup} from "@angular/forms";
import {switchMap, tap} from "rxjs/operators";
import {IBoxData} from "../../../../interface/box";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup = new FormGroup({
        email: new FormControl(''),
        password: new FormControl(''),
    });

    constructor(private  _authService: AuthService,
                private  _router: Router,
                private arboxService: ArboxService) {
    }

    ngOnInit() {
    }

    login(formData: { password: string, email: string }) {
        this.arboxService.login(formData)
            .pipe(
                tap(loginData => this._authService.setUser(loginData)),
                tap(_loginData => this.arboxService.getBoxData(_loginData.user.id).subscribe()),
                tap( _loginData => this.arboxService.getUserMembership(_loginData.user.id).subscribe()),
                switchMap( _loginData => this.arboxService.getBoxData(_loginData.user.id)),
                tap((boxes: IBoxData[]) => {
                    this._router.navigate(['/app/boxes/' + boxes[0].id])
                }),            )
            .subscribe();
    }
}
