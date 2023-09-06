import { Component } from '@angular/core';
import { LoginService } from 'src/app/Services/login.service';
import { User } from '../login/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangepasswordComponent {
  user: User = new User();
  confirmPassword: any;

  constructor(
    private loginService: LoginService,
    private toastr: ToastrService
  ) {}

  changePassword() {
    this.loginService.changePassword(this.user).subscribe({
      next: () => {
        this.toastr.success('Password changed successfully!');
      },
      error: (error) => {
        console.log(error);
        this.toastr.error('Password cant be updated, update failed!');
      },
    });
  }

  onSubmit() {
    const { username, password } = this.user;
    if (!username || !password || !!this.confirmPassword) {
      this.toastr.error('Please provide all the details!');
    } else if (password !== this.confirmPassword) {
      this.toastr.error('Passwords do not match!');
    } else {
      this.changePassword();
    }
  }
}
