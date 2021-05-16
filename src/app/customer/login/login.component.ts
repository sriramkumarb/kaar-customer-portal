import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: any = '';
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
  }

  isValid(controlName: any) {
    return this.loginForm.get(controlName)?.invalid && this.loginForm.get(controlName)?.touched;
  }

  movetoregister() {
    this.router.navigate(['../register'], { relativeTo: this.activatedRoute });
  }

  login() {

    if (this.loginForm.valid) {

      this.userService.login(this.loginForm.value).subscribe(
        data => {
          console.log(data);
          localStorage.setItem('token', data.toString());
          this.router.navigate(['/cus-portal/dashboard/' + this.loginForm.value.email + '/home'], { relativeTo: this.activatedRoute });
        },
        error => {
          this.errorMessage = "Username and Password is Incorrect!"
        }
      )
    }
  }
}
