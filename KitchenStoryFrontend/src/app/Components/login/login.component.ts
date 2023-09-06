import { Component } from '@angular/core';
import { LoginService } from 'src/app/Services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credentials = {
    username: '',
    password: '',
  };

  constructor(
    private loginService: LoginService,
    private toastr: ToastrService
  ) {}

  onSubmit() {
    if (!!this.credentials.username && !!this.credentials.password) {
      this.loginService.login(this.credentials).subscribe({
        next: (response: any) => {
          window.location.href = '/dashboard';
        },
        error: (error: any) => {
          this.toastr.error('Invalid credentials!');
        },
      });
    } else {
      this.toastr.warning('Please provide the credentials!');
    }
  }
}
