import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { Router, RouterLink } from '@angular/router';
import { registerconfirm, userregister } from '../../_model/user.model';
import { UserService } from '../../_service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private builder: FormBuilder, private service: UserService, private toastr: ToastrService,
    private router: Router) {

  }

  _response: any;

  _regform = this.builder.group({
    email: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
    confirmpassword: this.builder.control('', Validators.required),
  })

  proceedregister() {
    if (this._regform.valid) {
      let _obj: userregister = {
        email: this._regform.value.email as string,
        password: this._regform.value.password as string
      }
      this.service.Userregisteration(_obj).subscribe(item => {
        this._response = item;
        localStorage.setItem('token', this._response.token);
        console.log(this._response);
        if (this._response.token != null) {
          this.toastr.success('Registeration Successful', 'Registeration');
          this.router.navigateByUrl('/');
        } else {
          this.toastr.error('Failed due to : ' + this._response.error, 'Registeration Failed')
        }
      });

    }
  }

}
