import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { loginresp, menu,registerconfirm, usercred, userregister, UserResponse} from '../_model/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.apiUrl;

  _registerresp = signal<registerconfirm>({
    userid: 0,
    username: '',
    otptext: ''
  })

  _username=signal('');

  _menulist = signal<menu[]>([]);

  Userregisteration(_data: userregister) {
    return this.http.post(this.baseUrl + 'register', _data);
  }

  Confirmregisteration(_data: registerconfirm) {
    return this.http.post(this.baseUrl + 'User/confirmregisteration', _data);
  }

  Proceedlogin(_data: usercred) {
    return this.http.post<loginresp>(this.baseUrl + 'login', _data);
  }

  Loadmenubyrole(role: string) {
    return this.http.get<menu[]>(this.baseUrl +'users/2/');
  }

  Getallusers() {
    return this.http.get<UserResponse>(this.baseUrl + 'users/'); // Update return type
  }

}
