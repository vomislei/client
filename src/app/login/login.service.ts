import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {Subject} from 'rxjs/Subject';
import {AccessToken} from './access.token';
import {environment} from '../../environments/environment';

@Injectable()
export class LoginService implements CanActivate {

  userInfo: any;
  isAuthenticated = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const url = `${environment.api}/user-info`;
    return this.http.get(url).map(e => {
      this.userInfo = e;
      this.isAuthenticated.next(true);
      return true;
    }).catch(() => {
      this.loggout();
      return new ErrorObservable('User is not authenticated');
    });
  }

  getUserInfo(): any {
    return this.userInfo;
    //	console.log('username ll', username);
  }

  hasRole(role: string): boolean {
    if (this.getUserInfo() && this.getUserInfo().authorities) {
      return this.getUserInfo().authorities.filter(e => e.authority === 'ROLE_' + role).length > 0;
    }
    return false;

  }

  loggout() {
    Object.keys(new AccessToken()).forEach(key => localStorage.removeItem(key));
    this.isAuthenticated.next(false);
    this.userInfo = null;
    this.router.navigate(['/login']);
  }

  loggin(username: string, password: string): Observable<AccessToken> {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    params.append('grant_type', 'password');
   // loginService.getUserInfo()
		//	.then(response => {
			//	console.log('username l', username); // "org_admin"
		//	})
    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(`app:appsecret`)
    });

    return this.http.post<AccessToken>(`${environment.api}/oauth/token`, params.toString(), { headers: headers })
      .map(e => {
        Object.keys(e).forEach(key => localStorage.setItem(key, e[key]));
        this.isAuthenticated.next(true);
        return e;
      });
  }

}
