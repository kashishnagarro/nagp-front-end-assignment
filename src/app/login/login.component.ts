import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoggerService } from '../core/services/logger.service';
import { Router } from '@angular/router';
import { ValidationService } from '../core/services/validation.service';
import { AuthService } from '../core/services/auth.service';
import { IUserLogin } from '../shared/interfaces';
import { ToastrService, MessageType } from '../core/toastr/toastr.service';

@Component({
  selector: 'gm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private logger: LoggerService,
              private toastrService: ToastrService) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, ValidationService.emailValidator]],
      password: ['', [Validators.required, ValidationService.passwordValidator]]
    });
  }

  submit({ value, valid }: { value: IUserLogin, valid: boolean }) {
    this.authService.login(value)
      .subscribe((status: boolean) => {
        if (status) {
          this.toastrService.showMessage('Logged in', MessageType.Info);
          if (this.authService.redirectUrl) {
            const redirectUrl = this.authService.redirectUrl;
            this.authService.redirectUrl = '';
            this.router.navigate([redirectUrl]);
          } else {
            this.router.navigate(['/groceries']);
          }
        } else {
          const loginError = 'Unable to login';
          this.errorMessage = loginError;
          this.toastrService.showMessage(loginError, MessageType.Danger);
        }
      },
        (err: any) => this.logger.log(err));
  }

}
